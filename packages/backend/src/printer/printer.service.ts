import { Injectable } from '@nestjs/common'
import PdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'

const fonts = {
  Roboto: {
    normal: 'packages/backend/fonts/Roboto-Regular.ttf',
    bold: 'packages/backend/fonts/Roboto-Medium.ttf',
    italics: 'packages/backend/fonts/Roboto-Italic.ttf',
    bolditalics: 'packages/backend/fonts/Roboto-MediumItalic.ttf',
  },
}

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts)

  print(docDefinition: TDocumentDefinitions) {
    return this.printer.createPdfKitDocument(docDefinition)
  }
}
