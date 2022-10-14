import React from 'react';
import { Container, FileInfo, Preview } from './styles';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

const FileList = ({ files }) => (
    <Container>
        {files.map((uploadedFile) => (
            <li>
                <FileInfo>
                    <Preview src={uploadedFile.preview} />
                    <div>
                        <strong>{uploadedFile.name}</strong>
                        <span>
                            {uploadedFile.readableSize}
                            <button onClick={() => {}}>Excluir</button>
                        </span>
                    </div>
                </FileInfo>
                <div>
                    {!uploadedFile.uploaded && !uploadedFile.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: '#7159c1' },
                            }}
                            strokeWidth={10}
                            value={uploadedFile.progress}
                        />
                    )}

                    {uploadedFile.url && (
                        <a
                            href="https://st.depositphotos.com/1010338/2099/i/450/depositphotos_20999947-stock-photo-tropical-island-with-palms.jpg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink
                                style={{ marginRight: 8 }}
                                size={24}
                                color="#222"
                            />
                        </a>
                    )}

                    {uploadedFile.uploaded && (
                        <MdCheckCircle size={24} color="#78e5d5" />
                    )}
                    {uploadedFile.error && (
                        <MdError size={24} color="#e57878" />
                    )}
                </div>
            </li>
        ))}
    </Container>
);

export default FileList;
