import React, { memo } from 'react'
import { Card, Typography, Button, Select, MenuItem } from '../../../components'
import COUNTRIES from '../../../commons/constants/countries'
import { CardPanelContentStyled, ItemStyled } from './style'

const navigatorHasShare = navigator.share

function Panel({ updateAt, onChange, data, country }) {
  const { recovered } = data

  const renderCountries = (country, index) => (
    <MenuItem key={`country-${index}`} value={country.value}>
      <ItemStyled>
        <div>{country.label}</div>
        <img src={country.flag} alt={`País-${country.label}`} />
      </ItemStyled>
    </MenuItem>
  )

  const textCovid19 = `País: ${country} - recuperados: ${recovered}`
 
  const copyInfo = () => {
    navigator.clipboard.writeText(textCovid19)
  }

  const shareInfo = () => {
    navigator.share({
      title: `Dados da COVID-19 - ${country}`,
      text: textCovid19,
      url: 'https://covid19-project.netlify.app/'
    })
  }

  const renderShareButton = (
    <div>
      <Button variant="contained" color="primary" onClick={shareInfo}>
        Compartilhar
      </Button>
    </div>
  )

  const renderCopyButton = (
    <div>
      <Button variant="contained" color="primary" onClick={copyInfo}>
        Copiar
      </Button>
    </div>
  )

  return (
    <Card>
      <CardPanelContentStyled>
        <div>
          <Typography variant="h5" component="div" color="primary">COVID-19</Typography>
          <Typography variant="h6" component="div" color="primary">Painel Coronavírus</Typography>
          <Typography variant="subtitle2" component="div" color="primary">Atualizado em: {updateAt}</Typography>
          <div className="pt-2">
            <Select onChange={onChange} value={country}>
              {COUNTRIES.map(renderCountries)}
            </Select>
          </div>
        </div>
        {navigatorHasShare ? renderShareButton : renderCopyButton}
      </CardPanelContentStyled>
    </Card>
  )
}

export default memo(Panel)