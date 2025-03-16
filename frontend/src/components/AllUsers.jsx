import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  List,
  ListItem,
  Avatar,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FaHome, FaTrash, FaEdit } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [students, setStudents] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {  
      try {
        const response = await fetch('/api/users/all');  
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {  
    try {
      const response = await fetch(`/api/users/delete/${studentId}`, {  
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete student');
      }

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)  
      );

      toast({
        title: "Student deleted",
        description: "Student has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to delete student:', error);
      toast({
        title: "Error",
        description: "Failed to delete student",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10} bg="purple.50">
        <Spinner size="xl" color="purple.500" />
        <Text mt={4} fontWeight="bold" color="purple.600">Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mb={4} bg="purple.50" color="purple.600">
        <AlertIcon color="purple.600" />
        {error}
      </Alert>
    );
  }

  return (
    <Container maxW="lg" mt={5} bg="purple.50" p={6} borderRadius="md" boxShadow="md">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h2" size="lg" color="purple.700">
          All Students
        </Heading>
        <IconButton
          icon={<FaHome />}
          aria-label="Go to Home"
          variant="outline"
          colorScheme="purple"
          onClick={() => navigate('/')}
        />
      </Flex>
      <List spacing={4}>
        {students.length > 0 ? (
          students.map((student) => (
            <ListItem
              key={student._id}
              p={4}
              border="1px solid"
              borderColor="purple.200"
              borderRadius="md"
              bg="white"
              _hover={{ boxShadow: "lg", borderColor: "purple.500", cursor: "pointer" }}
              transition="all 0.2s"
            >
              <Flex alignItems="center" justify="space-between">
                <Flex alignItems="center" onClick={() => navigate(`/personal/${student._id}`)}>
                  <Avatar size="lg" src={student.profilePic} name={`${student.firstName} ${student.lastName}`} mr={4} />
                  <Box>
                    <Text fontWeight="bold" fontSize="xl" color="purple.700">
                      {student.firstName} {student.lastName}
                    </Text>
                    <Text fontSize="md" color="purple.600">Grade Level: <strong>{student.gradeLevel}</strong></Text>
                    <Text fontSize="md" color="purple.600">Roll Number: <strong>{student.rollno}</strong></Text>
                  </Box>
                </Flex>
                <Flex alignItems="center">
                  {/* Edit Button */}
                  <IconButton
                    icon={<FaEdit />}
                    aria-label="Edit Student"
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => navigate(`/edit/${student._id}`)} 
                    mr={2}
                    _hover={{ bg: "teal.100" }}
                  />
                  {/* Delete Button */}
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete Student"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleDelete(student._id)}
                    _hover={{ bg: "red.100" }}
                  />
                </Flex>
              </Flex>
            </ListItem>
          ))
        ) : (
          <Text color="purple.600">No students found</Text>
        )}
      </List>
    </Container>
  );
};

export default AllUsers;
