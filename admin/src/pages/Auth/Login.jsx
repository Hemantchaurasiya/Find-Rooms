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
    Text,
} from '@chakra-ui/react';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';
import { setAuth } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const user = {
                email:email,
                password:password,
            }
            console.log(user)
            const {data} = await axios.post('http://localhost:8800/api/auth/login',user);
            setIsLoggedIn(true);
            setIsLoading(false);
            setShowPassword(false);
            const access_token = data.access_token;
            const refresh_token = data.refresh_token;
            const userData = data.userData;
            dispatch(setAuth({user:userData}));
            localStorage.setItem("user", JSON.stringify({userData,access_token,refresh_token}));
            history.push('/');
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
                                <Heading>Login</Heading>
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
                                            'Sign In'
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

export default Login;