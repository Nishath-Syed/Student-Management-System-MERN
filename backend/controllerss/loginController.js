const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find student by username
        const student = await Student.findOne({ username });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Extract the year from the DOB ('YYYY-MM-DD')
        const dobYear = student.dob.split('-')[0];

        // Check if the password is the username + year from DOB
        const expectedPassword = username + dobYear;
        if (password !== expectedPassword) {
            return res.status(401).json({ message: "Invalid password" }); // Return error for incorrect password
        }

        // Here, generate token and set cookie for login
        generateTokenAndSetCookie(student._id, res);

        res.status(200).json({
            message: "Login successful",
            student: {
                rollno: student.rollno,
                firstName: student.firstName,
                lastName: student.lastName,
                dob: student.dob,
                gender: student.gender,
                email: student.email,
                phone: student.phone,
                address: student.address,
                motherName: student.motherName,
                motherPhone: student.motherPhone,
                fatherName: student.fatherName,
                fatherPhone: student.fatherPhone,
                gradeLevel: student.gradeLevel,
                profilePic: student.profilePic,
                username: student.username
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { loginUser };
