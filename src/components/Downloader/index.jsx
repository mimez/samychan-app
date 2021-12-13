import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';
import apiUrlGenerator from '../../utils/apiUrlGenerator';

const Download = function () {
  const { scmPackageHash } = useParams();
  return (
    <Container>
      <h1>Download</h1>
      <p>
        Thank you for using SamyCHAN. Click the download button and save the file to your usb-stick.
        Afterwards you can import the file into your SAMSUNG television.
      </p>
      <Button
        variant="contained"
        color="secondary"
        href={apiUrlGenerator.buildDownloadUrl(scmPackageHash)}
        startIcon={<CloudDownloadIcon />}
      >
        Download channel list
      </Button>
    </Container>
  );
};

export default Download;
