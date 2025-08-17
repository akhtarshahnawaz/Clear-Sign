// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/ERC7730CommunityReview.sol";

contract ERC7730CommunityReviewTest is Test {
    ERC7730CommunityReview public reviewContract;
    
    address public alice = address(0x1);
    address public bob = address(0x2);
    address public carol = address(0x3);
    
    address public constant CONTRACT_ADDRESS = address(0x1234567890123456789012345678901234567890);
    string public constant WALRUS_BLOB_ID = "vtrj4hZwDbqha2sCDBtJryloe8AqCD-Rq_C_TyNXBE4";
    string public constant HYPERGRAPH_ID = "QmHash123456789012345678901234567890123456789";
    
    function setUp() public {
        reviewContract = new ERC7730CommunityReview();
        vm.label(alice, "Alice");
        vm.label(bob, "Bob");
        vm.label(carol, "Carol");
    }
    
    function testSubmitMetadata() public {
        vm.startPrank(alice);
        
        reviewContract.submitMetadata(
            CONTRACT_ADDRESS,
            WALRUS_BLOB_ID,
            HYPERGRAPH_ID
        );
        
        ERC7730CommunityReview.MetadataSubmission memory submission = reviewContract.getSubmission(1);
        
        assertEq(submission.submitter, alice);
        assertEq(submission.contractAddress, CONTRACT_ADDRESS);
        assertEq(submission.walrusBlobId, WALRUS_BLOB_ID);
        assertEq(submission.hypergraphId, HYPERGRAPH_ID);
        assertTrue(submission.isActive);
        assertEq(submission.totalReviews, 0);
        assertEq(submission.positiveReviews, 0);
        assertEq(submission.negativeReviews, 0);
        
        vm.stopPrank();
    }
    
    function testSubmitMetadataDuplicateContractId() public {
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        vm.stopPrank();
        
        vm.startPrank(bob);
        vm.expectRevert("Contract address already submitted");
        reviewContract.submitMetadata(CONTRACT_ADDRESS, "different", "different");
        vm.stopPrank();
    }
    
    function testSubmitMetadataEmptyFields() public {
        vm.startPrank(alice);
        
        vm.expectRevert("Contract address cannot be zero");
        reviewContract.submitMetadata(address(0), WALRUS_BLOB_ID, HYPERGRAPH_ID);
        
        vm.expectRevert("Walrus blob ID cannot be empty");
        reviewContract.submitMetadata(CONTRACT_ADDRESS, "", HYPERGRAPH_ID);
        
        vm.expectRevert("Hypergraph ID cannot be empty");
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, "");
        
        vm.stopPrank();
    }
    
    function testSubmitReview() public {
        // Alice submits metadata
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        vm.stopPrank();
        
        // Bob reviews and approves
        vm.startPrank(bob);
        reviewContract.submitReview(1, true, "Great metadata!");
        vm.stopPrank();
        
        ERC7730CommunityReview.MetadataSubmission memory submission = reviewContract.getSubmission(1);
        assertEq(submission.totalReviews, 1);
        assertEq(submission.positiveReviews, 1);
        assertEq(submission.negativeReviews, 0);
        
        // Carol reviews and rejects
        vm.startPrank(carol);
        reviewContract.submitReview(1, false, "Needs improvement");
        vm.stopPrank();
        
        submission = reviewContract.getSubmission(1);
        assertEq(submission.totalReviews, 2);
        assertEq(submission.positiveReviews, 1);
        assertEq(submission.negativeReviews, 1);
    }
    
    function testSubmitReviewOwnSubmission() public {
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        
        vm.expectRevert("Cannot review own submission");
        reviewContract.submitReview(1, true, "Self review");
        vm.stopPrank();
    }
    
    function testSubmitReviewTwice() public {
        // Alice submits metadata
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        vm.stopPrank();
        
        // Bob reviews
        vm.startPrank(bob);
        reviewContract.submitReview(1, true, "First review");
        
        vm.expectRevert("Already reviewed this submission");
        reviewContract.submitReview(1, false, "Second review");
        vm.stopPrank();
    }
    
    function testSubmitReviewNonExistentSubmission() public {
        vm.startPrank(alice);
        vm.expectRevert("Submission does not exist");
        reviewContract.submitReview(999, true, "Review");
        vm.stopPrank();
    }
    
    function testDeactivateSubmission() public {
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        
        reviewContract.deactivateSubmission(1);
        
        ERC7730CommunityReview.MetadataSubmission memory submission = reviewContract.getSubmission(1);
        assertFalse(submission.isActive);
        vm.stopPrank();
    }
    
    function testDeactivateSubmissionNotOwner() public {
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        vm.stopPrank();
        
        vm.startPrank(bob);
        vm.expectRevert("Only submitter can deactivate");
        reviewContract.deactivateSubmission(1);
        vm.stopPrank();
    }
    
    function testGetSubmissionByContract() public {
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        vm.stopPrank();
        
        uint256 submissionId = reviewContract.getSubmissionByContract(CONTRACT_ADDRESS);
        assertEq(submissionId, 1);
        
        uint256 nonExistentId = reviewContract.getSubmissionByContract(address(0x999));
        assertEq(nonExistentId, 0);
    }
    
    function testGetUserSubmissions() public {
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        reviewContract.submitMetadata(address(0x9876543210987654321098765432109876543210), "blob2", "graph2");
        vm.stopPrank();
        
        uint256[] memory submissions = reviewContract.getUserSubmissions(alice);
        assertEq(submissions.length, 2);
        assertEq(submissions[0], 1);
        assertEq(submissions[1], 2);
    }
    
    function testGetReliabilityScore() public {
        // Alice submits metadata
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        vm.stopPrank();
        
        // No reviews yet
        uint256 score = reviewContract.getReliabilityScore(1);
        assertEq(score, 0);
        
        // Bob approves
        vm.startPrank(bob);
        reviewContract.submitReview(1, true, "Approved");
        vm.stopPrank();
        
        score = reviewContract.getReliabilityScore(1);
        assertEq(score, 100);
        
        // Carol rejects
        vm.startPrank(carol);
        reviewContract.submitReview(1, false, "Rejected");
        vm.stopPrank();
        
        score = reviewContract.getReliabilityScore(1);
        assertEq(score, 50); // 1 positive out of 2 total = 50%
    }
    
    function testGetTotalCounts() public {
        assertEq(reviewContract.getTotalSubmissions(), 0);
        assertEq(reviewContract.getTotalReviews(), 0);
        
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        vm.stopPrank();
        
        assertEq(reviewContract.getTotalSubmissions(), 1);
        
        vm.startPrank(bob);
        reviewContract.submitReview(1, true, "Review");
        vm.stopPrank();
        
        assertEq(reviewContract.getTotalReviews(), 1);
    }
    
    function testGetSubmissionReviews() public {
        vm.startPrank(alice);
        reviewContract.submitMetadata(CONTRACT_ADDRESS, WALRUS_BLOB_ID, HYPERGRAPH_ID);
        vm.stopPrank();
        
        vm.startPrank(bob);
        reviewContract.submitReview(1, true, "First review");
        vm.stopPrank();
        
        vm.startPrank(carol);
        reviewContract.submitReview(1, false, "Second review");
        vm.stopPrank();
        
        (uint256[] memory reviewIds, ERC7730CommunityReview.Review[] memory reviews) = reviewContract.getSubmissionReviews(1);
        
        assertEq(reviewIds.length, 2);
        assertEq(reviews.length, 2);
        assertEq(reviews[0].reviewer, bob);
        assertTrue(reviews[0].isApproved);
        assertEq(reviews[1].reviewer, carol);
        assertFalse(reviews[1].isApproved);
    }
}
