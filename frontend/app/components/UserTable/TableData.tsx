import * as React from 'react'
import { Icon, Table } from 'semantic-ui-react'

const TableData = ({client,volatilite,prix}) => (
    <Table celled size={"small"} columns={3} >
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell >Name</Table.HeaderCell>
                <Table.HeaderCell>Volatilité</Table.HeaderCell>
                <Table.HeaderCell>Prix du produit $</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>

            <Table.Row positive >
                <Table.Cell  className={"successfullySaved"}>{client["name"]}</Table.Cell>

                <Table.Cell >
                    <Icon name='checkmark' />
                    {volatilite}
                </Table.Cell>
                <Table.Cell >
                    <Icon name='checkmark' />
                    {prix}
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
)

export default TableData
