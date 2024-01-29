import { Container } from './styles'

export function Button({ title, loading = false, ...rest }) {
  return (
    <Container
      type="button"
      disabled={loading}
      {...rest}
    >
      {loading ? 'Carregando...' : title}
 {/*É verdadeiro?     Se sim     :se não */}
    </Container >
  )
}

//Teste 2