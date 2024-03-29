import {Block} from './base.js'

class FEABlock extends Block {
  constructor() {
    super()
    this.blockType = 'FEA'
    this.attributes = {}
  }

  addLine({code, parsedValue}) {
    switch (code) {
      case 'ATP': {
        if (this.capturingAttribute) {
          throw new Error('Already capturing attribute')
        }

        this.capturingAttribute = parsedValue[3]

        break
      }

      case 'ATV': {
        if (!this.capturingAttribute) {
          throw new Error('Found orphean attribute')
        }

        this.attributes[this.capturingAttribute] = parsedValue
        this.capturingAttribute = undefined

        break
      }

      case 'SCP': {
        this.featureType = parsedValue[3]

        break
      }

      default: if (code === 'QAP' && parsedValue[2] === 'QUP') {
        this.qup = 'QAL:' + parsedValue[3]
      }
    }
  }
}

export default FEABlock
