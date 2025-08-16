// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ERC7730CommunityReview
 * @dev A smart contract for community review of ERC7730 metadata submissions
 */
contract ERC7730CommunityReview is Ownable {
    // Structs
    struct MetadataSubmission {
        address submitter;
        string contractId;
        string walrusBlobId;
        string hypergraphId;
        uint256 submissionTime;
        bool isActive;
        uint256 totalReviews;
        uint256 positiveReviews;
        uint256 negativeReviews;
    }

    struct Review {
        address reviewer;
        bool isApproved;
        string comment;
        uint256 reviewTime;
    }

    // State variables
    uint256 private _submissionIds = 0;
    uint256 private _reviewIds = 0;

    mapping(uint256 => MetadataSubmission) public submissions;
    mapping(uint256 => mapping(uint256 => Review)) public reviews; // submissionId => reviewId => Review
    mapping(address => uint256[]) public userSubmissions; // user => submission IDs
    mapping(string => uint256) public contractToSubmission; // contractId => submissionId
    mapping(address => mapping(uint256 => bool)) public hasReviewed; // user => submissionId => hasReviewed

    // Events
    event MetadataSubmitted(
        uint256 indexed submissionId,
        address indexed submitter,
        string contractId,
        string walrusBlobId,
        string hypergraphId,
        uint256 timestamp
    );

    event ReviewSubmitted(
        uint256 indexed submissionId,
        uint256 indexed reviewId,
        address indexed reviewer,
        bool isApproved,
        string comment,
        uint256 timestamp
    );

    event SubmissionDeactivated(
        uint256 indexed submissionId,
        address indexed submitter,
        uint256 timestamp
    );

    // Modifiers
    modifier submissionExists(uint256 submissionId) {
        require(submissions[submissionId].submitter != address(0), "Submission does not exist");
        _;
    }

    modifier submissionActive(uint256 submissionId) {
        require(submissions[submissionId].isActive, "Submission is not active");
        _;
    }

    modifier notReviewed(uint256 submissionId) {
        require(!hasReviewed[msg.sender][submissionId], "Already reviewed this submission");
        _;
    }

    modifier notOwnSubmission(uint256 submissionId) {
        require(submissions[submissionId].submitter != msg.sender, "Cannot review own submission");
        _;
    }

    // Constructor
    constructor() Ownable(msg.sender) {}

    /**
     * @dev Submit metadata for community review
     * @param contractId The contract identifier
     * @param walrusBlobId The Walrus blob identifier for metadata JSON
     * @param hypergraphId The Hypergraph identifier for metadata knowledge graph
     */
    function submitMetadata(
        string memory contractId,
        string memory walrusBlobId,
        string memory hypergraphId
    ) external {
        require(bytes(contractId).length > 0, "Contract ID cannot be empty");
        require(bytes(walrusBlobId).length > 0, "Walrus blob ID cannot be empty");
        require(bytes(hypergraphId).length > 0, "Hypergraph ID cannot be empty");
        require(contractToSubmission[contractId] == 0, "Contract ID already submitted");

        _submissionIds++;
        uint256 submissionId = _submissionIds;

        submissions[submissionId] = MetadataSubmission({
            submitter: msg.sender,
            contractId: contractId,
            walrusBlobId: walrusBlobId,
            hypergraphId: hypergraphId,
            submissionTime: block.timestamp,
            isActive: true,
            totalReviews: 0,
            positiveReviews: 0,
            negativeReviews: 0
        });

        userSubmissions[msg.sender].push(submissionId);
        contractToSubmission[contractId] = submissionId;

        emit MetadataSubmitted(
            submissionId,
            msg.sender,
            contractId,
            walrusBlobId,
            hypergraphId,
            block.timestamp
        );
    }

    /**
     * @dev Submit a review for a metadata submission
     * @param submissionId The ID of the submission to review
     * @param isApproved Whether the metadata is approved or rejected
     * @param comment Optional comment explaining the decision
     */
    function submitReview(
        uint256 submissionId,
        bool isApproved,
        string memory comment
    ) external submissionExists(submissionId) submissionActive(submissionId) notReviewed(submissionId) notOwnSubmission(submissionId) {
        _reviewIds++;
        uint256 reviewId = _reviewIds;

        reviews[submissionId][reviewId] = Review({
            reviewer: msg.sender,
            isApproved: isApproved,
            comment: comment,
            reviewTime: block.timestamp
        });

        hasReviewed[msg.sender][submissionId] = true;

        MetadataSubmission storage submission = submissions[submissionId];
        submission.totalReviews++;
        if (isApproved) {
            submission.positiveReviews++;
        } else {
            submission.negativeReviews++;
        }

        emit ReviewSubmitted(
            submissionId,
            reviewId,
            msg.sender,
            isApproved,
            comment,
            block.timestamp
        );
    }

    /**
     * @dev Deactivate a submission (only submitter can do this)
     * @param submissionId The ID of the submission to deactivate
     */
    function deactivateSubmission(uint256 submissionId) external submissionExists(submissionId) {
        require(submissions[submissionId].submitter == msg.sender, "Only submitter can deactivate");
        require(submissions[submissionId].isActive, "Submission already deactivated");

        submissions[submissionId].isActive = false;

        emit SubmissionDeactivated(submissionId, msg.sender, block.timestamp);
    }

    /**
     * @dev Get submission details by ID
     * @param submissionId The submission ID
     * @return submission The metadata submission
     */
    function getSubmission(uint256 submissionId) external view returns (MetadataSubmission memory) {
        return submissions[submissionId];
    }

    /**
     * @dev Get submission ID by contract ID
     * @param contractId The contract ID
     * @return submissionId The submission ID (0 if not found)
     */
    function getSubmissionByContract(string memory contractId) external view returns (uint256) {
        return contractToSubmission[contractId];
    }

    /**
     * @dev Get all reviews for a submission
     * @param submissionId The submission ID
     * @return reviewIds Array of review IDs
     * @return reviewData Array of review data
     */
    function getSubmissionReviews(uint256 submissionId) external view returns (uint256[] memory reviewIds, Review[] memory reviewData) {
        require(submissions[submissionId].submitter != address(0), "Submission does not exist");
        
        uint256 totalReviews = submissions[submissionId].totalReviews;
        reviewIds = new uint256[](totalReviews);
        reviewData = new Review[](totalReviews);
        
        uint256 count = 0;
        for (uint256 i = 1; i <= _reviewIds && count < totalReviews; i++) {
            if (reviews[submissionId][i].reviewer != address(0)) {
                reviewIds[count] = i;
                reviewData[count] = reviews[submissionId][i];
                count++;
            }
        }
    }

    /**
     * @dev Get user submissions
     * @param user The user address
     * @return Array of submission IDs
     */
    function getUserSubmissions(address user) external view returns (uint256[] memory) {
        return userSubmissions[user];
    }

    /**
     * @dev Get submission reliability score (0-100)
     * @param submissionId The submission ID
     * @return score The reliability score (0-100)
     */
    function getReliabilityScore(uint256 submissionId) external view returns (uint256) {
        MetadataSubmission memory submission = submissions[submissionId];
        if (submission.totalReviews == 0) return 0;
        
        return (submission.positiveReviews * 100) / submission.totalReviews;
    }

    /**
     * @dev Get total submission count
     * @return Total number of submissions
     */
    function getTotalSubmissions() external view returns (uint256) {
        return _submissionIds;
    }

    /**
     * @dev Get total review count
     * @return Total number of reviews
     */
    function getTotalReviews() external view returns (uint256) {
        return _reviewIds;
    }
}
