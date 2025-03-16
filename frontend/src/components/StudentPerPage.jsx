import { Container, Table, Tbody, Tr, Td, Image, Box, Heading, Spinner, IconButton, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHome, FaUserEdit, FaEdit, FaTrash } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const StudentPerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useRecoilValue(userAtom); 

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${id}`);
        if (!response.ok) throw new Error('Failed to fetch student details');
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        setError('Failed to load student details');
      }
    };

    fetchStudent();
  }, [id]);


  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-around" mb="20px" mt={10}>
        <Heading as="h2" size="lg">Student Profile</Heading>
        <Box>
          {user.firstName === 'Shuichi' && user.lastName === 'Akai' && (
            <Button variant="ghost" fontSize="24px" onClick={() => navigate(`/edit/${id}`)}><FaUserEdit /></Button>
          )}
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back to Personal"
            onClick={() => navigate(`/personal/${id}`)}
            mr="2"
            bg="whiteAlpha.300"
            _hover={{ bg: "whiteAlpha.500" }}
          />
          <IconButton
            icon={<FaHome />}
            aria-label="Home"
            onClick={() => navigate('/')}
            bg="whiteAlpha.300"
            _hover={{ bg: "whiteAlpha.500" }}
          />
        </Box>
      </Box>

      <Container maxWidth="1000px" bg="orange.400" color="white" padding="20px" borderRadius="8px">
        <Table variant="unstyled" colorScheme="whiteAlpha">
          <Tbody>
            <Tr>
              <Td width="30%">
                <Image
                  src={student.profilePic || '/path/to/default-pic.jpg'}
                  alt="Profile"
                  boxSize="100px"
                  borderRadius="full"
                  objectFit="cover"
                  marginRight="15px"
                />
              </Td>
              <Td>
                <Heading as="h2" size="lg" color="black">{`${student.firstName} ${student.lastName}`}</Heading>
              </Td>
            </Tr>
            <Tr>
              <Th textAlign="left" fontWeight="bold" fontSize="md" padding="10px" borderBottom="1px solid black" color="black" width="30%">
                Roll Number
              </Th>
              <Td padding="10px" width="70%" color="black" fontWeight="bold">
                {student.rollno || 'N/A'}
              </Td>
            </Tr>
            <Tr>
              <Th textAlign="left" fontWeight="bold" fontSize="md" padding="10px" borderBottom="1px solid black" color="black" width="30%">
                Date of Birth
              </Th>
              <Td padding="10px" width="70%" color="black" fontWeight="bold">
                {new Date(student.dob).toLocaleDateString() || 'N/A'}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Container>

      <Container maxWidth="1000px" bg="white" padding="20px" borderRadius="8px" mt={4}>
        <Heading as="h3" size="lg" mb={4}>Student Grades</Heading>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>Grade Level</Td>
              <Td>{grades.gradeLevel}</Td>
            </Tr>
            <Tr>
              <Td>Subjects</Td>
              <Td>
                {grades.subjects.map((subject, index) => (
                  <div key={index}>
                    <strong>{subject.name}:</strong> {subject.score}/{subject.maxScore}
                  </div>
                ))}
              </Td>
            </Tr>
            <Tr>
              <Td>Overall Grade</Td>
              <Td>{grades.overallGrade}</Td>
            </Tr>
            <Tr>
              <Td>Comments</Td>
              <Td>{grades.comments}</Td>
            </Tr>
          </Tbody>
        </Table>

        {/* Admin Buttons */}
        <Box mt={4}>
          <Button leftIcon={<FaEdit />} onClick={handleEdit}>Edit Grades</Button>
          <IconButton
            icon={<FaTrash />}
            aria-label="Delete Grade"
            onClick={handleDelete}
            colorScheme="red"
            ml={4}
          />
        </Box>
      </Container>
    </>
  );
};

export default StudentPerPage;
