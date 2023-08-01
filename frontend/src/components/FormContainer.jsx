const FormContainer = ({ children }) => {
  return (
    <table>
      <tr className='justify-content-md-center mt-2'>
        <td className='card p-5'>
          {children}
        </td>
      </tr>
    </table>
  )
}

export default FormContainer