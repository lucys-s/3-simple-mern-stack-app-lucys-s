import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

/**
 * A React component that shows the About Us page. 
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [header, setHeader] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')

  /**
   * A nested function that fetches app info from the back-end server.
   */
  const fetchAppInfo = () => {
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const header = response.data.header
        setHeader(header)
        const bio = response.data.bio
        setBio(bio)
        const image = response.data.image
        setImage(image)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    fetchAppInfo()}, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Us</h1>
      <p>{bio}</p>
      <img src={image}></img>

    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
