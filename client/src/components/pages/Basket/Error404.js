import { Alert,AlertIcon } from "@chakra-ui/react"

function Error404() {
  return (
    <Alert status='error'>
    <AlertIcon />
    Error404, There was an error processing your request
  </Alert>
  )
}

export default Error404