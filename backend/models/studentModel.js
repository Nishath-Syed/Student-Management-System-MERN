import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  rollno: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  motherName: { type: String, required: true },
  motherPhone: { type: String, required: true },
  fatherName: { type: String, required: true },
  fatherPhone: { type: String, required: true },
  gradeLevel: { type: String, required: true },
  profilePic: { type: String, required: false }, // URL or path to profile image
});

const Student = mongoose.model('Student', studentSchema);

export default Student;

