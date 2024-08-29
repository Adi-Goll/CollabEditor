import React, { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


export default function TextEditor() {

    const [editorData, updateEditorData] = useState("")

    // useCallback lets us store a function definition between renders and makes sure
    // that the function is not continuously called everytime the page re-renders
    const editorCotainer = useCallback((wrapper) => {
        if (wrapper == null) return;

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)

        const quill = new Quill(editor, { theme: 'snow' })



    }, [])


    // editorContainer will store the function definition returned by the useCallback and then on subsequent 
    // renders it will use the same definition unless the dependencies change
    return (
        <div>
            <div className="container" ref={editorCotainer}></div>
        </div>)
}
