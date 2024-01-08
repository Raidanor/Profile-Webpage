
<form onSubmit={deleteRow}>
<label htmlFor="deleterow">Row number for deletion</label>
<input
    type = "number"
    id="deleterow"
    onChange= {(e) => setDeleteID(e.target.value)}
/>
<button>DELETE</button>
</form>

<form onSubmit={deleteName}>
<label htmlFor="deletename">Name for deletion</label>
<input
    type = "text"
    id = "deletename"
    onChange= {(e) => setDeleteCountry(e.target.value)}
/>
<button>DELETE</button>
</form>

const [deleteID, setDeleteID] = useState();
    
    const deleteRow = async (e) =>
    {
        e.preventDefault();

        console.log("Deleting row " + deleteID);

        const { error } = await supabase
            .from('countries')
            .delete()
            .eq('id', deleteID)

        if (error)
        {
            console.log("Error while deleting row")
        }

    }

    const [deleteCountry, setDeleteCountry] = useState('');
    
    const deleteName = async (e) =>
    {
        e.preventDefault();

        console.log("Deleting country where name = " + deleteCountry);

        const { error } = await supabase
            .from('countries')
            .delete()
            .eq('name', deleteCountry)

        if (error)
        {
            console.log("Error while deleting row")
        }
    }
