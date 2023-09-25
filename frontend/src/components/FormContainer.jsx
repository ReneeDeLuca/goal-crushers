const FormContainer = ({ children }) => {
  return (
    <table className="mx-auto">
      <tbody>
        <tr className="justify-content-center mt-2">
          <td className="card p-5">{children}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default FormContainer;
