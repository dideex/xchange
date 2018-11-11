import React, {Component} from 'react'
import styled from 'react-emotion'

import {Icons, container, H2, robotoSlab} from '../common'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

const Section = styled('section')`
  & {
    ${container} padding: 50px 0;
  }
`

const Grid = styled('div')`
  & {
    display: flex;
    padding-top: 40px;
  }
`

const LeftContent = styled('div')`
  & {
    flex: 30% 0 0;
  }
`
const RightContent = styled('div')`
  & {
    flex: 50% 0 0;
    margin-left: 150px;
  }
`

const H3 = styled('h3')`
  font-family: ${robotoSlab};
  font-size: 3.6rem;
  font-weight: 400;
  white-space: nowrap;
`

const P = styled('p')`
  font-size: 1.9rem;
  line-height: 1;
  padding-top: 20px;
`

// HowTo component;
class HowTo extends Component {
  render() {
    return (
      <Section>
        <H2>Как происходит обмен?</H2>
        <Grid>
          <LeftContent>
            <Icons id="howTo1" style={{width: 121}} />
            <H3>Заполняете данные</H3>
            <P>
              Выбираете валюту для обмена и для оплаты. Заполняете остальную форму данными
              и нажимаете “Отправить”.
            </P>
          </LeftContent>
          <Step1 style={{height: 500}} />
        </Grid>
        <Grid>
          <Step2 style={{height: 400}} />
          <RightContent>
            <Icons id="howTo2" style={{width: 121}} />
            <H3>Переводите деньги</H3>
            <P>
              На следующем шаге Вам будет предаставлен номер нашего кошелька для перевода
              на него денег для обмена(данные также будут доступны у Вас на почте). На
              который нужно будет перевести указанную сумму.
            </P>
          </RightContent>
        </Grid>
        <Grid>
          <LeftContent>
            <Icons id="howTo3" style={{width: 121}} />
            <H3>Подтверждаете перевод</H3>
            <P>
              После того как Вы совершили перевод, нужно его подтвердить на сайте в личном
              кабинете, или по ссылке из письма на электронной почте.
            </P>
          </LeftContent>
          <Step3 style={{height: 500, marginLeft: 80}} />
        </Grid>
        <Grid>
          <Step4 style={{height: 400}} />
          <RightContent>
            <Icons id="howTo4" style={{width: 121}} />
            <H3>Получаете деньги</H3>
            <P>
              Наш оператор убедиться в поступлении Ваши средств в систему и завершит
              транзакцию переводом.
            </P>
          </RightContent>
        </Grid>
      </Section>
    )
  }
}

export default HowTo
