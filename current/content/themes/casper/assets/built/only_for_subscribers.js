(() => {
    const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
    let $onlyForSubscribers, $contentWrapper, $addPayBlock;

    const getSubscribe = async () => {
        return await nearContract.isSubscriber({ currentUserID: nearWallet.getAccountId(), })
    }

    const hidePost = () => {
        $onlyForSubscribers.addClass('only-for-subscribers')
    }

    const createDivider = () => $(document.createElement('div'))
        .addClass('or or--x')
        .attr({
            'aria-role': 'presentation',
        })
        .text('\u24C3');

    const createPayHeader = () => $(document.createElement('div'))
        .css({
            fontWeight: 'bold'
        })
        .text('Full access available after subscription');

    const createPayBody = () => $(document.createElement('div'))
        .addClass(['wrapper', 'mt-2'])
        .append([
            $(document.createElement('input'))
                .attr({
                    type: 'radio',
                    name: 'select',
                    checked: true,
                    id: 'option-1',
                }),
            $(document.createElement('input'))
                .attr({
                    type: 'radio',
                    name: 'select',
                    id: 'option-2',
                }),
            $(document.createElement('label'))
                .attr({
                    for: 'option-1',
                })
                .addClass(['option', 'option-1'])
                .append([
                    $(document.createElement('div'))
                        .addClass('dot'),
                    $(document.createElement('span'))
                        .text('10 near for year')
                ]),
            $(document.createElement('label'))
                .attr({
                    for: 'option-2',
                })
                .addClass(['option', 'option-2'])
                .append([
                    $(document.createElement('div'))
                        .addClass('dot'),
                    $(document.createElement('span'))
                        .text('1 near for month')
                ]),
        ]);

    const createPayFooter = () => $(document.createElement('button'))
        .attr({
            type: 'button',
            id: 'submit-subscribe',
        })
        .css({
            width: '400px',
            fontSize: '20px',
            fontWeight: 'bold',
        })
        .addClass(['btn', 'btn-primary', 'mt-3',])
        .text('Subscribe now');

    const onSubmitSubscribeHandler = async () => {
        const value = $('#option-1').is(':checked') ? '10' : '1';
        const expirationDate = new Date();
        $('#option-1').is(':checked')
            ? expirationDate.setFullYear(expirationDate.getFullYear() + 1)
            : expirationDate.setMonth(expirationDate.getMonth() + 1)
        nearContract.addSubscriber({
            id: nearWallet.getAccountId(), expirationDate,
        }, BOATLOAD_OF_GAS, Big(value).times(10 ** 24).toFixed())
    }

    const onClickHandler = event => {
        const { id } = event.target;
        if (id === 'submit-subscribe') {
            onSubmitSubscribeHandler();
        }
    }

    const addPayBlock = () => {
        $addPayBlock = $(document.createElement('div'))
            .addClass(['d-flex', 'flex-column', 'justify-content-center', 'align-items-center'])
            .append([
                createDivider(),
                createPayHeader(),
                createPayBody(),
                createPayFooter(),
            ]);

        $contentWrapper.append($addPayBlock);
        $addPayBlock.on('click', onClickHandler)
    }

    const onReadyHandler = async () => {
        $onlyForSubscribers = $(utils.createDataSelector('id', selectors.onlyForSubscribers));
        if ($onlyForSubscribers.length) {
            const isSubscribed = await getSubscribe();
            if (!isSubscribed) {
                $contentWrapper = $onlyForSubscribers.parent();
                hidePost();
                addPayBlock();
            }
        }
    }

    $(onReadyHandler);
})()