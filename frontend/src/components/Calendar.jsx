function Calendar() {
    return (
        <section>
            <div>
                <h2>Goal Name</h2>
            </div>
            <div className='calendar-graph mx-md-2 mx-3 d-flex flex-column flex-items-end flex-xl-items-center overflow-hidden pt-1 is-graph-loading graph-canvas height-full text-center'>
                <div className='max-width: 100%; overflow-y: hidden; overflow-x: auto'>
                    <table >
                        <caption className='sr-only'>Goal activity</caption>
                        <thead>
                            <tr className='' style={{height: '15px'}}>
                                <th className=''style={{width: '29px'}}>
                                    <span className='sr-only'>Day of the Week</span>
                                </th>
                                <th className='goalCalendarLabel' colSpan={5}>
                                    <span className='sr-only'>January</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Jan</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={4}>
                                    <span className='sr-only'>February</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Feb</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={4}>
                                    <span className='sr-only'>March</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Mar</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={5}>
                                    <span className='sr-only'>April</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Apr</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={4}>
                                    <span className='sr-only'>May</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>May</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={4}>
                                    <span className='sr-only'>June</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Jun</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={5}>
                                    <span className='sr-only'>July</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Jul</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={4}>
                                    <span className='sr-only'>August</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Aug</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={4}>
                                    <span className='sr-only'>September</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Sep</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={5}>
                                    <span className='sr-only'>October</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Oct</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={4}>
                                    <span className='sr-only'>November</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Nov</span>
                                </th>
                                <th className='goalCalendarLabel' style="position: relative" colSpan={5}>
                                    <span className='sr-only'>December</span>
                                    <span aria-hidden='true' style='position: abosolute; top: 0'>Dec</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
    }

export default Calendar;