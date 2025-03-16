import React, { useState } from 'react';
import { LogOut, Eye, Menu, CheckCircle2 } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Textarea,
  VStack,
  Text,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import Logout from './Logout';
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

const services = [
  {
    name: 'Student Registration',
    description: 'Enroll new students and manage their profiles with ease.',
    image: 'https://img.freepik.com/free-vector/course-enrollment-abstract-concept-illustration-enroll-course-apply-degree-program-add-study-plan-online-enrollment-system-registration-form-new-student_335657-3491.jpg?w=360',
  },
  {
    name: 'Grade Management',
    description: 'Record, update, and track student grades for various subjects.',
    image: 'https://img.freepik.com/free-vector/grades-concept-illustration_114360-5958.jpg',
  },
  {
    name: 'Class Scheduling',
    description: 'Organize class schedules and assign teachers to the right classes.',
    image: 'https://img.freepik.com/free-vector/office-management-concept-illustration_114360-8941.jpg',
  },
];

const NavButton = ({ children, icon: Icon, onClick }) => (
  <Button
    onClick={onClick}
    colorScheme="purple"
    variant="outline"
    borderRadius="md"
    leftIcon={<Icon className="w-5 h-5 text-gray-600" aria-hidden="true" />}
    _hover={{ bg: 'purple.200', color: 'white' }}
  >
    {children}
  </Button>
);

const ContactForm = ({ onSubmit, isSubmitting }) => {
  return (
    <Box bg="purple.50" borderRadius="lg" boxShadow="lg" p={6} color="purple.500">
      <Heading as="h2" size="lg" mb={4} color="purple.600">
        Contact Us
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="email" color="purple.700">Email</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="you@example.com"
            borderColor="purple.300"
            focusBorderColor="purple.500"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel htmlFor="message" color="purple.700">Message</FormLabel>
          <Textarea
            id="message"
            rows="4"
            placeholder="Type your message here..."
            borderColor="purple.300"
            focusBorderColor="purple.500"
          />
        </FormControl>
        <Button
          type="submit"
          width="full"
          colorScheme="purple"
          variant="solid"
          mb={4}
          isLoading={isSubmitting}
          loadingText="Sending..."
          _hover={{ bg: 'purple.600', color: 'white' }}
        >
          Send Message
        </Button>
      </form>
    </Box>
  );
};

export default function HomePage() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);

      event.target.reset();

      setTimeout(() => setFormSubmitted(false), 1000);
    }, 1000);
  };

  return (
    <Box minHeight="100vh" bg="gray.50">
      {formSubmitted && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bg="green.500"
          color="white"
          p={4}
          textAlign="center"
          zIndex={50}
        >
          <Container maxW="7xl">
            <Flex alignItems="center" justifyContent="center">
              <CheckCircle2 className="mr-2" size={24} />
              <Text fontWeight="semibold">Message sent successfully!</Text>
            </Flex>
          </Container>
        </Box>
      )}

      {/* Navigation */}
      <Box bg="black" color="white" shadow="md">
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <HStack spacing={4}>
              <Image src="https://media.istockphoto.com/id/1478688327/vector/user-symbol-account-symbol-vector.jpg?s=612x612&w=0&k=20&c=N1Wxw0XjkUoXT9_Vaxa4SNIj1IvdJ2L2GQfEVVMTaFM=" alt="School Logo" boxSize="42px" />
              <Text fontSize="xl" fontWeight="bold" color="white">
                {user?.firstName}
              </Text>
            </HStack>
            <Flex justify="flex-end" align="center" gap={4} display={{ base: 'none', sm: 'flex' }}>
              {user?.firstName === "Shuichi" && user?.lastName === 'Akai' && (
                <>
              <NavButton
                    icon={FaUserPlus}
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </NavButton>
                  <NavButton
                    icon={FaEye}
                    onClick={() => navigate('/all')}
                  >
                    View
                  </NavButton>
                </>
              )}


              {user?.firstName !== 'Shuichi' && user?.lastName !== "Akai" && (
                <>
                  <NavButton
                    icon={FaEye}
                    onClick={() => navigate(`/personal/${user._id}`)}
                    
                  >
                    View 
                  </NavButton>
                </>
              )}
            <Box ml={4}></Box>
              <Logout />
            </Flex>
            <Box display={{ base: 'flex', sm: 'none' }}>
              <Button
                variant="outline"
                colorScheme="purple.300"
                leftIcon={<Menu className="h-6 w-6" aria-hidden="true" />}
                _hover={{ bg: 'purple.300 !important', color: 'black !important' }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box as="main">
        <Container maxW="7xl" py={6}>
          <Box p={4}>
            <VStack spacing={4} textAlign="center" bg="rgba(255, 255, 255, 0.8)" borderRadius="md" p={6}>
              <Heading size="xl" fontWeight="bold" color="purple.500">Welcome to Horizon School</Heading>
              <Text fontSize="xl" fontWeight="bold" color="purple.500">We provide the best education for your children.</Text>
            </VStack>
          </Box>

          <Box>
            <Image 
              src="https://www.shutterstock.com/image-vector/back-school-vector-banner-design-260nw-2479418713.jpg" 
              alt="Campus Image" 
              width="100%" 
              objectFit="cover" 
              height="380px" 
            />
          </Box>

          <Box mt={10} minHeight="400px">
            <Heading as="h2" size="lg" mb={4} color="purple.600">Our Services</Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={15}>
              {services.map((service, index) => (
                <Box 
                  key={index} 
                  bg="white" 
                  boxShadow="lg" 
                  borderRadius="lg" 
                  overflow="hidden" 
                  _hover={{ bg: 'purple.50' }} 
                  minHeight="350px"
                >
                  <Box p={5} display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <HStack>
                      <Image src={service.image} alt={service.name} boxSize="250px" />
                      <VStack align="start">
                        <Text fontSize="sm" fontWeight="medium" color="purple.500" noOfLines={1}>
                          {service.name}
                        </Text>
                        <Text fontSize="lg" fontWeight="medium" color="gray.800">{service.description}</Text>
                      </VStack>
                    </HStack>
                    <Box bg="purple.100" p={3}>
                      <Button 
                        variant="link" 
                        colorScheme="purple" 
                        size="sm" 
                        onClick={() => navigate(`/services`, { state: { serviceName: service.name, description: service.description } })}
                      >
                        Learn more
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Box mt={10}>
            <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </Box>
        </Container>
      </Box>

      <Box bg="black" color="purple.100" py={12}>
        <Container maxW="7xl">
          <Flex justify="center" align="center" flexDirection={{ base: 'column', md: 'row' }}>
            <HStack spacing={6}>
              {['Facebook', 'Twitter', 'GitHub'].map((item) => (
                <Button key={item} variant="link" colorScheme="purple" _hover={{ color: 'white' }}>
                  <Text fontSize="sm">{item}</Text>
                </Button>
              ))}
            </HStack>
            <Text mt={{ base: 4, md: 0 }} fontSize="sm">&copy; 2024 Horizon, Inc. All rights reserved.</Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}





