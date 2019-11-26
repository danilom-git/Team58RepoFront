import React, {Component} from 'react';

function ListItem({ id, name, country, city, address }) {
    return (
        <div>
            <span>{name}</span>
        </div>
    );
}

const ze_data = [
    {
        id: 1,
        name: 'a',
        country: 'count_a',
        city: 'city_a',
        address: 'address_a'
    },
    {
        id: 2,
        name: 'b',
        country: 'count_b',
        city: 'city_b',
        address: 'address_b'
    }
];

class ClinicList extends Component {
    render() {
        return (
            <div>
                {
                    ze_data.map(clinic =>
                    <ListItem
                        id={clinic.id}
                        name={clinic.name}
                        country={clinic.country}
                        city={clinic.city}
                        address={clinic.address}
                    />)
                }
            </div>
        )
    }
}

export default ClinicList;
