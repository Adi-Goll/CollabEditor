import React, { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


export default function TextEditor() {


    const toolbarOptions = [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ];

    // useCallback lets us store a function definition between renders and makes sure
    // that the function is not continuously called everytime the page re-renders
    const editorCotainer = useCallback((wrapper) => {
        if (wrapper == null) return;

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)

        const quill = new Quill(editor, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            }
        })


    }, [])

    const insertDropDown = () => {
        console.log("testing")
    }



    // editorContainer will store the function definition returned by the useCallback and then on subsequent 
    // renders it will use the same definition unless the dependencies change
    return (
        <div>
            <div className="container" ref={editorCotainer}></div>
        </div>)

}
