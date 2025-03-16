import generateTokenAndSetCookie from '../utils/helpers/generateWebToken.js';
import Student from '../models/studentModel.js'; 

const registerStudent = async (req, res) => {
  try {
    const {
      rollno,
      firstName,
      lastName,
      dob,
      gender,
      email,
      phone,
      address,
      motherName,
      motherPhone,
      fatherName,
      fatherPhone,
      gradeLevel,
      profilePic
    } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const newStudent = new Student({
      rollno,
      firstName,
      lastName,
      dob,
      gender,
      email,
      phone,
      address,
      motherName,
      motherPhone,
      fatherName,
      fatherPhone,
      gradeLevel,
      profilePic
    });

    await newStudent.save();

    return res.status(201).json({
      message: 'Student registered successfully',
      student: {
        id: newStudent._id,
        firstName: newStudent.firstName,
        lastName: newStudent.lastName,
        email: newStudent.email,
        phone: newStudent.phone
      }
    });
  } catch (error) {
    console.error('Error registering student:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login student
const loginStudent = async (req, res) => {
  const { username, password } = req.body;

  try {
    const extractedLastName = password.replace(/\d{4}$/, "");
    const student = await Student.findOne({ lastName: extractedLastName });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const dobYear = student.dob.split('-')[0];
    const expectedUsername = `${student.firstName}`;
    const expectedPassword = `${student.lastName}${dobYear}`;

    if (username !== expectedUsername || password !== expectedPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    generateTokenAndSetCookie(student._id, res);

    res.status(200).json(student);

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout student
const logoutStudent = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({
      firstName: { $ne: "Shuichi" },
      lastName: { $ne: "Akai" }
    });

    res.status(200).json(students);
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get student's personal information
const getPersonal = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({
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
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Edit student's information
const editStudent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating student data', error });
  }
};

// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  registerStudent, 
  loginStudent, 
  logoutStudent, 
  getAllStudents, 
  getPersonal, 
  editStudent,
  getStudentById,
  deleteStudent
};
