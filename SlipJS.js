
 // SECURE REGISTRY: Map Employee IDs to their respective DOBs (Format: YYYY-MM-DD)
    // You can easily add, remove, or change entries here using Notepad.
    const EMPLOYEE_REGISTRY = {
        "C62921": "2000-01-01",
        "C62922": "2001-01-01",
        "C62923": "2002-01-01",
        "C62924": "2003-01-01"
    };

    let confirmedFilePath = "";
    let confirmedEmpId = "";

    function verifyAndSearch() {
        const empIdInput = document.getElementById('empId').value.trim();
        const dobInput = document.getElementById('dob').value; // Returns YYYY-MM-DD
        const messageDiv = document.getElementById('message');
        const previewSection = document.getElementById('previewSection');
        const pdfFrame = document.getElementById('pdfFrame');

        // Clear previous state
        previewSection.style.display = "none";
        messageDiv.innerText = "";

        if (!empIdInput || !dobInput) {
            messageDiv.style.color = "red";
            messageDiv.innerText = "Please complete both fields.";
            return;
        }

        // 1. Check if the Employee ID exists in our system registry
        const registeredDob = EMPLOYEE_REGISTRY[empIdInput];

        // 2. Verification Security Logic
        if (registeredDob && registeredDob === dobInput) {
            // Success: Construct the original path structure using the exact ID matching format
            confirmedEmpId = empIdInput;
            confirmedFilePath = `salary_slips/${empIdInput}_SalarySlip.pdf`;

            // Inject the targeted file path into the viewer element
            pdfFrame.src = confirmedFilePath;

            messageDiv.style.color = "green";
            messageDiv.innerText = "Identity Verified Successfully!";
            
            // Render the hidden document window and action buttons
            previewSection.style.display = "block";
        } else {
            // Failed match control
            messageDiv.style.color = "red";
            messageDiv.innerText = "Access Denied: Invalid Employee ID or Date of Birth.";
        }
    }

    function downloadPayslip() {
        if (!confirmedFilePath) return;

        // Automatically trigger document download sequence
        const anchor = document.createElement('a');
        anchor.href = confirmedFilePath;
        anchor.download = `${confirmedEmpId}_SalarySlip.pdf`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }