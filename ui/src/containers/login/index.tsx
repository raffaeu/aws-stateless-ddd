import { useState } from "react";
import {
    Header,
    Form,
    SpaceBetween,
    Button,
    Container,
    FormField,
    Input,
    Alert
} from "@cloudscape-design/components";
import { AuthenticateUser } from "../../store/auth/actions";
import { useAppSelector } from "../../hooks/reduxHooks";

import './login.scss';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const state = useAppSelector(state => state.auth);

    const onCancelClick = () => {
        setUsername('');
        setPassword('');
        //clean
        setUsernameError('');
        setPasswordError('');
    }

    const onSubmitClick = async () => {
        // validation
        if (username.length < 1) {
            setUsernameError('The Username is a mandatory field');
            return;
        }
        if (password.length < 1) {
            setPasswordError('The Password is a mandatory field');
            return;
        }
        //clean
        setUsernameError('');
        setPasswordError('');
        // authenticate
        await AuthenticateUser(username, password);
    }

    return (
        <div className="login">
            <div className="loginLeft">
                <SpaceBetween direction="vertical" size="l">
                    <form onSubmit={e => e.preventDefault()}>
                        <Form
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button formAction="none" variant="normal" onClick={onCancelClick}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={onSubmitClick} loading={state.isAuthenticating}>
                                        Login
                                    </Button>
                                </SpaceBetween>
                            }
                            header={
                                <Header
                                    variant="h1"
                                    description="Provide your Username and Password in order to access the system"
                                >
                                    <div className="header"></div>
                                    Portal Login
                                </Header>
                            }
                        >
                            <Container
                                header={
                                    <Header variant="h2">
                                        Credentials
                                    </Header>
                                }
                            >
                                <SpaceBetween direction="vertical" size="l">
                                    <FormField
                                        label="Your Username"
                                        errorText={usernameError.length > 0 ? usernameError : ''}
                                    >
                                        <Input
                                            value={username}
                                            onChange={({ detail }) => setUsername(detail.value)}
                                            autoFocus
                                            placeholder="Enter your username" />
                                    </FormField>
                                    <FormField
                                        errorText={passwordError.length > 0 ? passwordError : ''}
                                        label="Your Password">
                                        <Input
                                            value={password}
                                            onChange={({ detail }) => setPassword(detail.value)}
                                            type="password"
                                            placeholder="Enter your Password" />
                                    </FormField>
                                </SpaceBetween>
                            </Container>
                        </Form>
                    </form>

                    <Alert
                        visible={state.error.length > 0}
                        type="error"
                        header="An Error occurred while authenticating"
                    >
                        {state.error}
                    </Alert>
                </SpaceBetween>
            </div>

        </div>
    )
}

export default Login;