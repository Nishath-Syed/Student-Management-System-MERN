import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Flex, Image, Text, Button, Spinner } from '@chakra-ui/react';
import { FaHome, FaUserEdit } from "react-icons/fa";
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const StudentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/users/personal/${id}`);  
        if (!response.ok) throw new Error('Failed to fetch student details');
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return <Spinner size="xl" color="purple.500" margin="20px" />;

  const isUserShuichi = user.firstName === 'Shuichi' && user.lastName === 'Akai';

  return (
    <Box maxWidth="800px" margin="0 auto" padding="20px" fontFamily="Arial, sans-serif">
      {/* Header Section */}
      <Flex justifyContent="flex-end" alignItems="center" mb="20px">
        {isUserShuichi && (
          <Button variant="ghost" fontSize="24px" onClick={() => navigate(`/edit/${id}`)} color="purple.500">
            <FaUserEdit />
          </Button>
        )}
        <Button variant="ghost" fontSize="24px" onClick={() => navigate('/')} color="purple.500">
          <FaHome />
        </Button>
      </Flex>

      <Box mb="20px" textAlign="center">
        <Image
          src={student.profilePic}
          alt="Profile"
          boxSize="120px"
          borderRadius="full"
          objectFit="cover"
          mb="10px"
          mx="auto"  
        />
        <Text fontSize="2xl" fontWeight="bold" color="purple.700">
          {`${student.firstName} ${student.lastName}`}
        </Text>
      </Box>

      <Box>
        <Flex wrap="wrap" gap="10px" justifyContent="center">
          <DetailItem label="Date of Birth" value={student.dob} />
          <DetailItem label="Gender" value={student.gender} />
          <DetailItem label="Email" value={student.email} />
          <DetailItem label="Phone Number" value={student.phone} />
          <DetailItem label="Address" value={student.address} />
          <DetailItem label="Mother Name" value={student.motherName} />
          <DetailItem label="Mother Phone" value={student.motherPhone} />
          <DetailItem label="Father Name" value={student.fatherName} />
          <DetailItem label="Father Phone" value={student.fatherPhone} />
          <DetailItem label="Grade Level" value={student.gradeLevel} />
        </Flex>
      </Box>
    </Box>
  );
};

const DetailItem = ({ label, value }) => (
  <Box
    flex="1"
    minWidth="45%"
    bg="purple.50"
    p="10px"
    borderRadius="8px"
    boxShadow="0 1px 4px rgba(0, 0, 0, 0.1)"
  >
    <Text fontWeight="bold" color="purple.700">{label}:</Text>
    <Text color="purple.800">{value}</Text>
  </Box>
);

export default StudentPage;
