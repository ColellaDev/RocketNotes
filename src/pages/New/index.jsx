import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { ButtonText } from '../../components/ButtonText'

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { api } from "../../services/api"

import { Container, Form } from './styles'

export function New() {

const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
 

const [links, setLinks] = useState([])
const [newLink, setNewLink] = useState("")

const [tags, setTags] = useState([])
const [newTag, setNewTag] = useState("")

const navigate = useNavigate()

function handleBack(){
  navigate(-1)
}

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

async function handleNewNote() {
  if(!title){
    return alert("Digite um título para sua nota")
  }

  if(newLink){
    return alert("Você deixou um Link no campo adicionar mas não clicou em adicionar.")
  }

  if(newTag){
    return alert("Você deixou uma Tag no campo adicionar mas não clicou em adicionar.")
  }

  if (!newLink && links.length === 0) {
    return alert("Digite um link para nota.")
  }
  
  if (!newTag && tags.length === 0) {
    return alert("Digite uma tag para nota.")
  }

  await api.post("/notes", {
    title,
    description,
    tags,
    links
  })

  alert("Nota criada com sucesso!")
  navigate(-1)
}


  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText
             title="Voltar"
             onClick={handleBack}
             />
          </header>

          <Input 
          onChange = {e => setTitle(e.target.value)}
          placeholder="Título" 
          />

          <Textarea
           placeholder="Observações"
           onChange = { e => setDescription(e.target.value)}
            />

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

          <Button 
          title="Salvar" 
          onClick={handleNewNote}
          />

        </Form>
      </main>
    </Container>
  )
}