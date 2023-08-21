const FormContainer = ({ children }) => {
  return (
    <table>
      <tbody>
      <tr className='justify-content-md-center mt-2'>
        <td className='card p-5'>
          {children}
        </td>
      </tr>
      </tbody>
    </table>
  )
}

export default FormContainer