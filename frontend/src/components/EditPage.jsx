import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  useToast,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai'; 

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    rollno: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    motherName: '',
    motherPhone: '',
    fatherName: '',
    fatherPhone: '',
    gradeLevel: '',
    profilePic: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/users/get/${id}`); 
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch student data",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Student updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate('/all'); 
      } else {
        const errorData = await response.json();
        console.error('Error updating student:', errorData.message);
        toast({
          title: "Error",
          description: "Failed to update student",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10} bg="purple.50">
        <Spinner size="xl" color="purple.500" />
        <Heading mt={4} color="purple.600">Loading...</Heading>
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" margin="0 auto" padding="20px" bg="purple.50" fontFamily="Arial, sans-serif">
      <Flex justifyContent="space-between" alignItems="center" borderBottom="2px solid #ddd" pb="10px">
        <Heading fontSize="2xl" color="purple.700">Edit Student Information</Heading>
        <IconButton
          icon={<AiOutlineEye />} 
          aria-label="View Student Information"
          variant="outline"
          colorScheme="purple"
          onClick={() => navigate('/all')} 
        />
      </Flex>

      <Box
        rounded="lg"
        bg="purple.100"
        boxShadow="lg"
        p={8}
        mt={4}
        borderRadius="md"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel color="purple.700">Roll Number</FormLabel>
                <Input
                  type="text"
                  bg="white"
                  name="rollno"
                  value={formData.rollno}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="purple.700">First Name</FormLabel>
                <Input
                  type="text"
                  bg="white"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel color="purple.700">Last Name</FormLabel>
                <Input
                  type="text"
                  bg="white"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel color="purple.700">Date of Birth</FormLabel>
              <Input
                type="date"
                bg="white"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="purple.700">Gender</FormLabel>
              <Input
                type="text"
                bg="white"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="purple.700">Email</FormLabel>
              <Input
                type="email"
                bg="white"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="purple.700">Phone Number</FormLabel>
              <Input
                type="tel"
                bg="white"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="purple.700">Address</FormLabel>
              <Input
                type="text"
                bg="white"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="purple.700">Mother's Name</FormLabel>
              <Input
                type="text"
                bg="white"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel color="purple.700">Mother's Phone</FormLabel>
                <Input
                  type="text"
                  bg="white"
                  name="motherPhone"
                  value={formData.motherPhone}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel color="purple.700">Father's Name</FormLabel>
                <Input
                  type="text"
                  bg="white"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel color="purple.700">Father's Phone</FormLabel>
              <Input
                type="tel"
                bg="white"
                name="fatherPhone"
                value={formData.fatherPhone}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="purple.700">Grade Level</FormLabel>
              <Input
                type="text"
                bg="white"
                name="gradeLevel"
                value={formData.gradeLevel}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="purple.700">Profile Picture URL</FormLabel>
              <Input
                type="text"
                bg="white"
                name="profilePic"
                value={formData.profilePic}
                onChange={handleChange}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                type="submit"
                bg="purple.400"
                color="white"
                _hover={{ bg: 'purple.500' }}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default EditPage;
