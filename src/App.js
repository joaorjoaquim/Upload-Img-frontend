import GlobalStyle from './styles/global';
import { Container, Content } from './styles';
import Upload from './components/Upload';
import FileList from './components/Upload/FileList';

function App() {
    return (
        <Container>
            <Content>
                <Upload />
                <FileList />
            </Content>
            <GlobalStyle />
        </Container>
    );
}

export default App;
