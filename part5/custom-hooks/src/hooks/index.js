import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    
    useEffect(() => {
        updateResource();
    }, []);

    const updateResource = () => {
        axios.get(baseUrl)
            .then(res => {
                //console.log(res);
                setResources(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const create = (resource) => {
      console.log(resource);
      axios.post(baseUrl, resource)
            .then(res => {
                //setResources(res.data);
                updateResource();
            })
            .catch(err => {
                console.log(err);
            });
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
}