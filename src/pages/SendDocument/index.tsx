import styles from './InputFile.module.css'

export function InputFile() {
  return(
    <form className={styles.formInputFile} action="">
      {/* 
      Campos:
        - Nome do documento
        - Categoria
        - Vencimento
        - 
        
      */}
      <input type="file" name="" id="" />
      <button>Enviar Documento</button>
    </form>
  )
}