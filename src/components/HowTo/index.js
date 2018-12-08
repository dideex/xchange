import React from 'react'
import styled from 'react-emotion'
import {FormattedMessage} from 'react-intl'

import {Icons, container, H2, robotoSlab} from '../common'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

const Section = styled('section')`
  & {
    ${container}
    padding: 50px 0;
  }
`

const Grid = styled('div')`
  & {
    position: relative;
    overflow: hidden;
    display: flex;
    padding-top: 40px;
    @media (max-width: 767px) {
      flex-wrap: wrap;
      & > * {
        flex: 100% 0 0;
        max-width: 100%;
      }
      & > div {
        padding: 15px 15px;
      }
      .howto__step1,
      .howto__step3 {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 700px;
        max-width: none;
      }
      .howto__step2 {
        margin: 0 auto;
        max-width: 60%;
      }
      .howto__step3 {
        margin-left: 0 !important;
      }
      &:nth-child(2),
      &:nth-child(4) {
        padding-bottom: 500px;
      }
      &:nth-child(3),
      &:nth-child(5) {
        svg {
          order: 1;
        }
        & > div {
          order: 0;
        }
      }
    }
  }
`

const LeftContent = styled('div')`
  & {
    flex: 30% 0 0;
    @media (max-width: 767px) {
      flex: 100% 0 0;
      text-align: center;
    }
  }
`
const RightContent = styled('div')`
  & {
    flex: 50% 0 0;
    margin-left: 150px;
    @media (max-width: 767px) {
      flex: 100% 0 0;
      text-align: center;
      margin-left: 0;
    }
  }
`

const H3 = styled('h3')`
  font-family: ${robotoSlab};
  font-size: 3.6rem;
  font-weight: 400;
  white-space: nowrap;
  @media (max-width: 767px) {
    font-size: 2.5rem;
  }
`

const P = styled('p')`
  font-size: 1.9rem;
  line-height: 1;
  padding-top: 20px;
`

// Component contains 'HowTo' section, in the home route
export default () => (
  <Section>
    <H2>
      <FormattedMessage
        id="home.howTo.mainHeader"
        defaultMessage="Как происходит обмен?"
      />
    </H2>
    <Grid>
      <LeftContent>
        <Icons id="howTo1" style={{width: 121}} />
        <H3>
          <FormattedMessage
            id="home.howTo.subHeader1"
            defaultMessage="Заполняете данные"
          />
        </H3>
        <P>
          <FormattedMessage
            id="home.howTo.step1"
            defaultMessage="Выбираете валюту для обмена и для оплаты. Заполняете остальную форму данными и нажимаете “Отправить”"
          />
        </P>
      </LeftContent>
      <Step1 style={{height: 500}} />
    </Grid>
    <Grid>
      <Step2 style={{height: 400}} />
      <RightContent>
        <Icons id="howTo2" style={{width: 121}} />
        <H3>
          <FormattedMessage
            id="home.howTo.subHeader2"
            defaultMessage="Переводите деньги"
          />
        </H3>
        <P>
          <FormattedMessage
            id="home.howTo.step2"
            defaultMessage="На следующем шаге Вам будет предаставлен номер нашего кошелька для перевода на него денег для обмена(данные также будут доступны у Вас на почте). На который нужно будет перевести указанную сумму"
          />
        </P>
      </RightContent>
    </Grid>
    <Grid>
      <LeftContent>
        <Icons id="howTo3" style={{width: 121}} />
        <H3>
          <FormattedMessage
            id="home.howTo.subHeader3"
            defaultMessage="Подтверждаете перевод"
          />
        </H3>
        <P>
          <FormattedMessage
            id="home.howTo.step3"
            defaultMessage="После того как Вы совершили перевод, нужно его подтвердить на сайте в личном кабинете, или по ссылке из письма на электронной почте"
          />
        </P>
      </LeftContent>
      <Step3 style={{height: 500, marginLeft: 80}} />
    </Grid>
    <Grid>
      <Step4 style={{height: 400}} />
      <RightContent>
        <Icons id="howTo4" style={{width: 121}} />
        <H3>
          <FormattedMessage
            id="home.howTo.subHeader4"
            defaultMessage="Получаете деньги"
          />
        </H3>
        <P>
          <FormattedMessage
            id="home.howTo.step4"
            defaultMessage="Наш оператор убедиться в поступлении Ваши средств в систему и завершит транзакцию переводом"
          />
        </P>
      </RightContent>
    </Grid>
  </Section>
)
