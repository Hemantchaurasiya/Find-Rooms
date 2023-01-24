import { useState } from 'react';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    CircularProgress,
    InputGroup,
    InputRightElement,
    Icon,
    Text
} from '@chakra-ui/react';
import ErrorMessage from './ErrorMessage';
import { useHistory} from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        const user = {
            email:email,
            password:password,
        }
        console.log(user);
        try {
            await axios.post('http://localhost:8800/api/auth/register',user);
            setIsLoggedIn(true);
            setIsLoading(false);
            setShowPassword(false);
            history.push('/login');
        } catch (error) {
            setError('Invalid username or password');
            setIsLoading(false);
            setEmail('');
            setPassword('');
            setShowPassword(false);
        }
    };

    return (
        <div>
            <Flex marginTop='12' width="full" align="center" justifyContent="center">
                <Box
                    p={8}
                    maxWidth="500px"
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    {isLoggedIn ? (
                        <Box textAlign="center">
                            <Text>{email} logged in!</Text>
                            <Button
                                variantColor="orange"
                                variant="outline"
                                width="full"
                                mt={4}
                                onClick={() => setIsLoggedIn(false)}
                            >
                                Sign out
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Box textAlign="center">
                                <Heading>Register</Heading>
                            </Box>
                            <Box my={4} textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    {error && <ErrorMessage message={error} />}
                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type="email"
                                            placeholder="test@test.com"
                                            size="lg"
                                            onChange={event => setEmail(event.currentTarget.value)}
                                        />
                                    </FormControl>

                                    <FormControl isRequired mt={6}>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="*******"
                                                size="lg"
                                                onChange={event => setPassword(event.currentTarget.value)}
                                            />
                                            <InputRightElement width="3rem">
                                                <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                                                    {showPassword ? <Icon name="view-off" /> : <Icon name="view" />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>

                                    <Button
                                        variantColor="teal"
                                        variant="outline"
                                        type="submit"
                                        width="full"
                                        mt={4}
                                    >
                                        {isLoading ? (
                                            <CircularProgress
                                                isIndeterminate
                                                size="24px"
                                                color="teal"
                                            />
                                        ) : (
                                            'Sign Up'
                                        )}
                                    </Button>
                                </form>
                            </Box>
                        </>
                    )}
                </Box>
            </Flex>
        </div>
    )
}

export default Register;