(() => {
    const addCurrentDate = () => {
        const $currentDate = $(utils.createDataSelector('id', selectors.currentDate));
        if ($currentDate.length) {
            $currentDate.text(moment().format('MMM Do YY'));
        }
    }

    const addWalletData = async () => {
        const $totalBalance = $(utils.createDataSelector('id', selectors.balance.total));
        const $stateStaked = $(utils.createDataSelector('id', selectors.balance.stateStaked));
        const $staked = $(utils.createDataSelector('id', selectors.balance.staked));
        const $available = $(utils.createDataSelector('id', selectors.balance.available));
        const { total, stateStaked, staked, available } = await utils.getNearBalance();
        if ($totalBalance.length) {
            $totalBalance.text(utils.nearBalanceToFixed(total, 2))
        }
        if ($stateStaked.length) {
            $stateStaked.text(utils.nearBalanceToFixed(stateStaked, 2))
        }
        if ($staked.length) {
            $staked.text(utils.nearBalanceToFixed(staked, 2))
        }
        if ($available.length) {
            $available.text(utils.nearBalanceToFixed(available, 2))
        }
    }

    const addDetails = async () => {
        const $nearAccountDetailsWrapper = $(utils.createDataSelector('id', selectors.nearAccountDetailsWrapper))
        if ($nearAccountDetailsWrapper.length) {
            const { authorizedApps } = await utils.getNearAccountDetails();
            if (authorizedApps?.length) {
                authorizedApps.forEach(({ contractId, amount, publicKey }, index) => {
                    const $textWidget = $(document.createElement('div'))
                        .addClass('text')
                        .append([
                            $(document.createElement('div'))
                                .addClass('title')
                                .text(contractId),
                            $(document.createElement('div'))
                                .addClass('description')
                                .text(`Public key: ${publicKey}`)
                        ]);
                    const $textSection = $(document.createElement('div'))
                        .addClass('section1')
                        .append([
                            $textWidget,
                        ]);
                    const $amountSection = $(document.createElement('div'))
                        .addClass('section2')
                        .append([
                            $(document.createElement('div'))
                                .addClass('value')
                                .text(utils.nearBalanceToFixed(amount, 2))
                        ]);
                    const $wrapper = $(document.createElement('div'))
                        .append([
                            $textSection,
                            $amountSection,
                        ])
                        .addClass('item1');
                    $nearAccountDetailsWrapper.append($wrapper)
                })
            }
        }
    }

    const onReadyHandler = () => {
        if (window.location.href.includes('near-wallet')) {
            addCurrentDate();
            addWalletData();
            addDetails();
        }
    }
    $(onReadyHandler);
})()
