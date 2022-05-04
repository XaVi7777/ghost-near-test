const loginbtn = `
<h3 data-id="near-user-id"></h3>
<button data-id="near-signin-signout">SignIn</button>
`

const walletTable = `
<table>
	<tr>
        <td>Total</td>
        <td data-id="total"></td>
    </tr>
    <tr>
        <td>State staked</td>
        <td data-id="stateStaked"></td>
    </tr>
    <tr>
        <td>Staked</td>
        <td data-id="staked"></td>
    </tr>
    <tr>
        <td>Available</td>
        <td data-id="available"></td>
    </tr>
</table>
`

const getAccountBalance = `
<input type="text" placeholder="Enter account" data-id="near-get-account-balance" />
`

const getAccountDetails = `
<input type="text" placeholder="Enter account" data-id="near-get-account-details" />
`