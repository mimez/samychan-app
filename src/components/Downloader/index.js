import React from "react";
import Container from '@material-ui/core/Container';
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Button from "@material-ui/core/Button";
import apiUrlGenerator from "../../utils/apiUrlGenerator";

export default (props) => {
  console.log(props)
  return (
    <Container>
      <h1>Download</h1>
      <p>Thank you for using SamyCHAN. Click the download button and save the file to your usb-stick. Afterwards you can import the file into your SAMSUNG television.</p>
      <Button variant="contained" color="secondary" href={apiUrlGenerator.buildDownloadUrl(props.match.params.scmPackageHash)} startIcon={<CloudDownloadIcon />}>Download channel list</Button>
    </Container>
  )
}