import React, { useEffect, useState } from 'react';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import GlobalStyle from './styles/global';
import { Container, Content } from './styles';
import Upload from './components/Upload';
import FileList from './components/FileList';
import api from './services/api';

function App() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    /*
    useEffect(() => {
        const fetchData = async () => {
    const response = await api.get('posts');
  }
  fetchData()

        setUploadedFiles({
            uploadedFiles: response.data.map((file) => ({
                id: file._id,
                name: file.name,
                readableSize: filesize(file.size),
                preview: file.url,
                uploaded: true,
                url: file.url,
            })),
        });
    } []);
    */

    const handleUpload = (files) => {
        const uploadedFilesAux = files.map((file) => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }));

        setUploadedFiles((uploadedFiles) => [
            ...uploadedFiles,
            uploadedFilesAux,
        ]);
        uploadedFilesAux.forEach(processUpload);
    };

    //imagino que o erro ta nessa função, q é a responsavel por pegar meus files e exibir, nesse caso ali era
    const updateFile = (id, data) => {
        setUploadedFiles(
            uploadedFiles.map((uploadedFile) => {
                return id === uploadedFile.id
                    ? { ...uploadedFile, ...data }
                    : uploadedFile;
            })
        );
    };

    const processUpload = (uploadedFile) => {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api.post('posts', data, {
            onUploadProgress: (e) => {
                const progress = parseInt(
                    Math.round((e.loaded * 100) / e.total)
                );

                updateFile(uploadedFile.id, {
                    progress,
                });
            },
        })
            .then((response) => {
                updateFile(uploadedFile.id, {
                    uploaded: true,
                    id: response.data._id,
                    url: response.data.url,
                });
            })
            .catch(() => {
                updateFile(uploadedFile.id, {
                    error: true,
                });
            });
    };

    const handleDelete = async (id) => {
        await api.delete(`posts/${id}`);

        setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
    };

    return (
        <Container>
            <Content>
                <Upload onUpload={handleUpload} />
                {!!uploadedFiles.length && (
                    <FileList files={uploadedFiles} onDelete={handleDelete} />
                )}
            </Content>
            <GlobalStyle />
        </Container>
    );
}
export default App;
