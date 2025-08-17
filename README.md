# MetaProof: ERC7730 Community Review

Blindly signing smart contract transactions is one of the biggest risks in web3. When users approve interactions without fully understanding the underlying contract, they expose themselves to malicious code, hidden permissions, or irreversible asset loss. A trusted metadata layer—what we call Clear-Sign—solves this problem by giving users transparent, standardized information about what they are actually signing before they commit.

The challenge is that implementing Clear-Sign at scale requires a universal metadata standard, which ERC7730 introduces. However, ERC7730’s promise quickly runs into practical hurdles: millions of contracts exist, each with unique structures and evolving behaviors, making it nearly impossible for any single authority or automated tool to maintain accurate metadata. Without reliable, verified data, the standard risks being incomplete or misleading, which brings us back to the original problem.

This is where MetaProof steps in. By creating a community-driven validation layer for ERC7730 metadata, MetaProof transforms the burden of centralized curation into a decentralized process of review, verification, and consensus. Instead of relying on opaque sources or incomplete automation, the ecosystem collectively ensures that contract metadata is accurate, trustworthy, and up-to-date. Through open collaboration, peer validation, and transparent governance, MetaProof makes Clear-Sign viable at scale—turning blind signatures into informed, secure decisions.


We built MetaProof by integrating Ledger’s ERC7730 metadata generation tool directly into our community verification platform. This allows users to generate ERC7730-compliant metadata JSON files and seamlessly submit them to the community for review and scoring. Once generated, each JSON is stored as a blob on Walrus, and its corresponding hash (blob ID) is broadcasted to the community. This design ensures immutability and verifiability — reviewers can independently retrieve the JSON through its blob ID, verify its contents, and then vote or leave comments on its validity.

The voting process forms the backbone of our reliability scoring mechanism. Each submission accumulates votes from community members, which we aggregate into a reliability score reflecting consensus on the accuracy and trustworthiness of the metadata. These scores, coupled with reviewer comments, create a transparent validation layer. Any external wallet can then integrate Clear-Sign by calling our API, retrieving both the ERC7730 metadata and its associated reliability score, and displaying that information directly to end users before they sign a transaction.

On the technical side, we used Next.js to build the frontend interface, ensuring a responsive and modern user experience. Backend services were written in Python, handling aggregation logic, API endpoints, and scoring calculations. Our smart contracts, written in Solidity, manage the on-chain voting process and ensure that votes and comments are transparently recorded. For storage, we relied on Walrus to store the actual JSON blobs, guaranteeing persistence, while the Flow network hosts the contract deployments.


# Documentation Feedback for Ledger
My overall experience using the ERC-7730 documentation has been positive. The docs are simple, clean, and easy to follow, which makes them very beginner-friendly. I found that the lack of excessive detail was actually helpful at the start, since the hardest part is always getting set up quickly. The external references provided in different places are also useful, as they allow readers to dig deeper into more technical aspects when needed.

That said, I did notice some gaps. For the specific case of working with ERC-7730, the concise nature of the docs worked well, but I can imagine that for users working with the device management kit or exploring advanced use cases, the documentation may feel too lightweight. It sometimes assumes background knowledge, and in those cases, a bit more depth would go a long way.

One particular pain point for me was the lack of documentation around the ERC-7730 Python package and the JSON builder. I ended up spending almost ten hours trying to figure out how to set them up and make them work properly. A dedicated section or quick-start guide for these tools would save developers a lot of time. For example, a short page that shows: how to install the Python package, how to initialize the JSON builder, and a working “hello world”-style example would be extremely valuable.

Related to that, I also found it difficult when some code examples did not run as expected due to version mismatches. It would be very helpful if the documentation clearly mentioned the exact package versions used in each code snippet. That way, developers can easily reproduce the examples without running into deprecation errors or compatibility issues.

In terms of tutorials, I don’t think you need a lot more code samples, but having setup and environment notes alongside the examples would strengthen them significantly. For instance, indicating “tested with Python 3.10 and erc7730-json-builder vX.Y.Z” would immediately clarify compatibility.

From a UX perspective, I really enjoyed the dark, high-contrast UI—it makes reading pleasant and easy on the eyes. If I had one suggestion, it would be to make the central reading panel white or a lighter color, which would give it a more professional look and improve long-form readability while still keeping the surrounding dark theme.

Overall, I think the documentation is already strong, and its clarity makes ERC-7730 approachable even for new developers. With just a few additions—especially around setup guides, package usage, and versioning—it could become a best-in-class resource that accelerates adoption of transparent transaction signing in the Ethereum ecosystem.


# 🏗️ Project Structure

The project is organized into three primary modules:

1. **erc7730-community-review-dapp** (main decentralized application)  
2. **python-erc7730**  
3. **clear-signing-erc7730-builder**

---

## 1. erc7730-community-review-dapp
This module contains the main decentralized application, consisting of both a **frontend** (built with Next.js) and a **backend** (implemented in Solidity).

- The `contracts` folder contains the smart contracts (backend).  
- The `frontend` folder contains the Next.js application (frontend).  

This module is fully independent and can be hosted as a standalone application without requiring other modules.

---

## 2. python-erc7730
This is a modified fork of Ledger’s official `python-erc7730` package, designed for validation and processing of ERC-7730 JSON files.

**Enhancements include:**
- Integration of the **OpenAI API** to automatically generate human-readable naming for functions and fields.

---

## 3. clear-signing-erc7730-builder
This module is a modified fork of Ledger’s JSON builder.

**Added functionality:**
- Simplified JSON creation  
- Enhanced visualization of JSON structures  
- Direct submission to **Walrus**  
- Direct submission to the **ERC-7730 Community Review**

This builder depends on the `python-erc7730` package, as it uses the Python package for API access.

---

# 🚀 Installation

## Installing `erc7730-community-review-dapp`
1. Deploy the contracts located in the `contracts` folder.  
2. Navigate to the `frontend` folder.  
3. Configure the `.env.local` file with the following variables:  
   - `RPC_URL`  
   - `CONTRACT_ADDRESS`  
   - `WALRUS_PUBLISHER_URL`  
   - `WALRUS_AGGREGATOR_URL`  
4. Install dependencies and start the development server:  
   ```bash
   npm install
   npm run dev
   ```
A more detailed setup guide is available inside the erc7730-community-review-dapp folder.

## Installing `python-erc7730` and `clear-signing-erc7730-builder`

1. Clone the `python-erc7730` package and install it locally:

   ```bash
   pip install .
   ```
2. Clone the `clear-signing-erc7730-builder` repository.
3. Navigate into the folder, install dependencies, and run the application:

   ```bash
   npm install
   npm run dev
   ```

This will start both the web application and the FastAPI backend.

```

Do you want me to also prepare a **README.md ready version** (with a project intro, badges, and links section), so it looks polished for GitHub?
```
