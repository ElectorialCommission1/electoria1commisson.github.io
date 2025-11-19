document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm1');
    const nextButton = document.getElementById('nextButton');
    const districtSelect = document.getElementById('district');
    const dobInput = document.getElementById('dob');

    // --- 1. Populate Ugandan Districts/Cities ---
    const ugandaDistricts = [
        "Kampala City", "Arua City", "Gulu City", "Mbarara City", "Jinja City",
        "Masaka City", "Mbale City", "Fort Portal City", "Lira City", "Soroti City",
        "Adjumani", "Amolatar", "Amuria", "Apac", "Arua", "Bushenyi", "Gulu",
        "Hoima", "Iganga", "Jinja", "Kabale", "Kabala", "Kalungu", "Kamuli",
        "Kanungu", "Kapchorwa", "Kasese", "Kibale", "Kiboga", "Kisoro", "Kitgum",
        "Koboko", "Kotido", "Kumi", "Lira", "Luwero", "Masindi", "Mbarara",
        "Mityana", "Moroto", "Moyo", "Nakapiripirit", "Nakasongola", "Nebbi",
        "Pader", "Pallisa", "Rakai", "Rukungiri", "Sembabule", "Soroti",
        "Tororo", "Yumbe"
        // Add more districts as needed
    ].sort(); // Sort alphabetically

    ugandaDistricts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });


    // --- 2. Validation and Next Button Activation ---

    // Define the list of inputs that must be filled
    const requiredInputs = [
        document.getElementById('firstName'),
        document.getElementById('lastName'),
        document.getElementById('dob'),
        districtSelect,
        document.getElementById('village'),
        document.getElementById('phone')
    ];
    const genderRadios = document.getElementsByName('gender');

    function checkFormValidity() {
        let isAllTextFilled = requiredInputs.every(input => input.value.trim() !== '');
        let isGenderSelected = Array.from(genderRadios).some(radio => radio.checked);
        let isPhoneValid = document.getElementById('phone').value.length === 9;
        let isDOBValid = checkDOBLimit(dobInput.value);

        // All conditions must be met to enable the button
        if (isAllTextFilled && isGenderSelected && isPhoneValid && isDOBValid) {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = true;
        }
    }

    // Listener for all input changes
    form.addEventListener('input', checkFormValidity);

    // Specific listener for phone number to enforce 9 digits
    document.getElementById('phone').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 9); // Only digits, max 9
        checkFormValidity();
    });

    // --- 3. Date of Birth Limit Check ---
    function checkDOBLimit(dateString) {
        if (!dateString) return false;

        const inputDate = new Date(dateString);
        // The limit: must be born ON or BEFORE 2007, meaning the year 2007 is the MAX allowed year.
        const maxYearAllowed = 2007;

        return inputDate.getFullYear() <= maxYearAllowed;
    }

    dobInput.addEventListener('change', () => {
        const dobHint = document.getElementById('dob-hint');
        if (checkDOBLimit(dobInput.value)) {
            dobInput.style.border = '1px solid #ccc';
            dobHint.style.color = '#888';
        } else {
            dobInput.style.border = '2px solid red'; // Highlight error
            dobHint.style.color = 'red';
        }
        checkFormValidity();
    });


    // --- 4. Form Submission (Simulate Step 2 Navigation) ---
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop default form submission
        
        // Final check before navigating (though button state should prevent this)
        if (!nextButton.disabled) {
            // Navigate to the next step
            window.location.href = 'step2.html';
        }
    });
});