import React, { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'



const SAVE_INTERVAL_MS = 2000

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

export default function TextEditor() {

    const { id: documentId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {
        const curSocket = io("http://localhost:5000")
        setSocket(curSocket)

        return () => {
            curSocket.disconnect()
        }


    }, [])


    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document', documentId)

    }, [socket, quill, documentId])


    // useEffect(() => {
    //     if (socket == null || quill == null) return

    //     const interval = setInterval(() => {
    //         socket.emit('save-document', quill.getContents())

    //     }, SAVE_INTERVAL_MS)

    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [socket, quill])



    useEffect(() => {
        if (socket == null || quill == null) return
        const handler = delta => {
            quill.updateContents(delta)
        }
        socket.on('receive-changes', handler)

        return () => {
            socket.off('receive-changes', handler)
        }
    }, [socket, quill])

    useEffect(() => {
        if (socket == null || quill == null) return
        const handler = (delta, oldDelta, source) => {
            if (source !== "user") return
            socket.emit("send-changes", delta)
        }

        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [socket, quill])


    // useCallback lets us store a function definition between renders and makes sure
    // that the function is not continuously called everytime the page re-renders
    const editorCotainer = useCallback(wrapper => {
        if (wrapper == null) return;

        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)

        const q = new Quill(editor, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            },
        })

        q.disable()
        q.setText('Loading...')
        setQuill(q)


    }, [])


    // editorContainer will store the function definition returned by the useCallback and then on subsequent 
    // renders it will use the same definition unless the dependencies change
    return <div className="container" ref={editorCotainer}></div>

}
