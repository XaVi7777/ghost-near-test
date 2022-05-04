(() => {
    let $signInBtn;

    let isFetching = false;

    const signInHandler = async () => {
        if ($signInBtn.length) {
            const accountID = nearWallet.getAccountId();
            const account = await nearAPI.account(accountID);
            const balance = await account.getAccountBalance();
            $signInBtn
                .empty()
                .addClass('dropdown-toggle')
                .attr({
                    id: 'profile-dropdown',
                    'aria-expanded': 'false',
                    'data-bs-toggle': 'dropdown',
                })
                .text(accountID);
            $(utils.createDataSelector('id', selectors.nearWalletBalance))
                .css({
                    fontWeight: 'bold',
                })
                .text(+(balance.total / 1e24).toFixed(2));
        }
    }
    const signOutHandler = () => {
        if ($signInBtn.length) {
            $(selectors.siteMain).hide();
        }
    }

    const toggleSignInSignOut = () => nearIsAuthentificated
        ? signInHandler()
        : signOutHandler();

    const connectNear = () => {
        try {
            // connect to NEAR
            window.nearAPI = new nearApi.Near({
                keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
                ...getNearConfig(window.nearOptions.networkID)
            });

            // connect to the NEAR Wallet
            window.nearWallet = new nearApi.WalletConnection(nearAPI, nearOptions.appName);
            // connect to a NEAR smart contract
            window.nearContract = new nearApi.Contract(
                nearWallet.account(),
                window.nearOptions.contract.id, {
                viewMethods: window.nearOptions.contract.viewMethods,
                changeMethods: window.nearOptions.contract.changeMethods,
            });

            window.nearIsAuthentificated = nearWallet.isSignedIn();
            toggleSignInSignOut();
        } catch (error) {
            console.error('Error with connect to near', error)
        }
    }

    const onClickHandler = async (event) => {
        if (!isFetching) {
            isFetching = true;
            const id = $(event.target).data('id');
            if (id === selectors.signInBtn && !nearIsAuthentificated) {
                nearWallet.requestSignIn({
                    contractId: nearContract.contractId,
                    successUrl: nearOptions.successUrl,
                });
            } else if (id === selectors.signOutBtn && nearIsAuthentificated) {
                nearWallet.signOut();
                window.location.replace(nearOptions.signOutUrl || '/');
            }
            isFetching = false;
        }
    }

    const setListeners = () => {
        const $profileDropdownWrapper = $(utils.createDataSelector('id', selectors.profileDropdownWrapper));
        if ($profileDropdownWrapper.length) {
            $profileDropdownWrapper.on('click', onClickHandler)
        }
    }

    const onReadyHandler = () => {
        $signInBtn = $(utils.createDataSelector('id', selectors.signInBtn));
        connectNear();
        setListeners();
    }

    $(onReadyHandler);
})();
