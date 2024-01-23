import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Link } from 'react-router-dom'
import { useState } from "react"

import { Container, Form } from './styles'

export function New() {
const [links, setLinks] = useState([])
const [newLink, setNewLink] = useState("")

const [tags, setTags] = useState([])
const [newTag, setNewTag] = useState("")

function handleAddLink(){
  setLinks( prevState => [...prevState, newLink] ) // Mantem oq tinha antes "prevState" e adiciona o newLink
  setNewLink("") // "Resetar" o estado do NewLink, limpar ele
}

function handleRemoveLink(linkDeleted) { //deleted recebe o Link
  setLinks(prevState => prevState.filter((link, index) => index !== linkDeleted)) // Filter retorna a lista de Links sem o "deleted"
}

function handleAddTag() {
  setTags(prevState => [...prevState, newTag])
  setNewTag("")
}

function handleRemoveTag(tagDeleted) { 
  setTags(prevState => prevState.filter((tag, index) => index !== tagDeleted)) 
}


  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input placeholder="Título" />
          <Textarea placeholder="Observações" />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                key={String(index)}
                value={link}
                onClick={() => {handleRemoveLink(index)}}
                /> 
              ))
            }
            <NoteItem 
            isNew 
            placeholder="Novo link" 
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick={handleAddLink}
            /> 

          </Section>
          

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) =>(
                  <NoteItem 
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(index)}
                  />
                ))
              }

              <NoteItem 
              isNew 
              placeholder="Nova tag"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onClick={handleAddTag}
              />

            </div>
          </Section>

          <Button title="Salvar" />
        </Form>
      </main>
    </Container>
  )
}