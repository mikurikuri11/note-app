import './Main.css'
import ReactMarkdown from 'https://esm.sh/react-markdown@7'

const Main = ({ activeNote, onUpdateNote }) => {

  const onEditNote = (key ,value) => {
    onUpdateNote({
      ...activeNote,
      [key] : value,
      modDate: Date.now(),
    })
  }

  if (!activeNote) return <div className='no-active-note'>ノートを選択してください</div>

  return (
    <div className='app-main'>
      <div className='app-main-note-edit'>
        <input id='title' type='text' value={activeNote.title} onChange={(e) => onEditNote("title", e.target.value)} />
        <textarea id='content' placeholder='ノート内容を記入' value={activeNote.content} onChange={(e) => onEditNote("content", e.target.value)} ></textarea>
      </div>
      <div className='app-main-note-preview'>
        <h1 className='preview-title'>{activeNote.title}</h1>
        <div className='markdown-preview'>
          <ReactMarkdown>
            {activeNote.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Main
