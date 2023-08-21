import React, {createContext, useState
} from 'react'

const ContextFile = ({children}) => {
    const Context = createContext()
    const [checkBox, setCheckBox] = useState([])
  return (
    <Context.Provider value={{ checkBox, setCheckBox }}>
    {children}
</Context.Provider>
  )
}

export default ContextFile