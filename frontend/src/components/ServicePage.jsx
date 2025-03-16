import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  IconButton,
  Tooltip,
  Flex,
  Image,
  Container,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const serviceName = location.state?.serviceName;
  const serviceDescription = location.state?.description;

  if (!serviceName) {
    navigate('/');
    return null;
  }

  const detailedDescription = {
    "Student Registration": (
      <>
        <Image
          src="https://img.freepik.com/free-vector/course-enrollment-abstract-concept-illustration-enroll-course-apply-degree-program-add-study-plan-online-enrollment-system-registration-form-new-student_335657-3491.jpg?w=360"
          alt="Student Registration"
          mb={4}
          borderRadius="md"
          mx="auto" 
        />
        <Text fontSize="lg" color="gray.600" mb={4}>
          Enroll new students effortlessly with our comprehensive registration system, ensuring accurate record-keeping and easy updates to student profiles. Our streamlined process helps you manage your institution’s student data with efficiency and security.
        </Text>
      </>
    ),
    "Grade Management": (
      <>
        <Image
          src="https://img.freepik.com/free-vector/grades-concept-illustration_114360-5958.jpg"
          alt="Grade Management"
          mb={4}
          borderRadius="md"
          mx="auto" 
        />
        <Text fontSize="lg" color="gray.600" mb={4}>
          Our grade management system allows you to seamlessly record, update, and analyze students' grades across subjects, providing detailed insights into academic progress and enabling more informed educational decisions.
        </Text>
      </>
    ),
    "Class Scheduling": (
      <>
        <Image
          src="https://img.freepik.com/free-vector/office-management-concept-illustration_114360-8941.jpg"
          alt="Class Scheduling"
          mb={4}
          borderRadius="md"
          mx="auto" 
        />
        <Text fontSize="lg" color="gray.600" mb={4}>
          Organize and maintain class schedules with ease. Our system enables you to assign teachers to classes, manage timings, and ensure smooth day-to-day operations by keeping everyone informed and aligned.
        </Text>
      </>
    ),
  };

  return (
    <Box bg="gray.50" minHeight="100vh" py={10}>
      <Container maxW="7xl">
        <Flex justify="flex-end" mb={6}>
          <Tooltip label="Go Home" aria-label="Home tooltip">
            <IconButton
              icon={<FaHome />}
              onClick={() => navigate('/')}
              colorScheme="purple"
              variant="ghost"
              size="lg"
              boxSize="28px" 
            />
          </Tooltip>
        </Flex>

        <VStack spacing={6} align="start" textAlign="center">
          <Heading as="h1" size="xl" color="purple.600">
            {serviceName}
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            {serviceDescription}
          </Text>
          <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" width="full">
            {detailedDescription[serviceName] || <Text>No further details available.</Text>}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePage;
