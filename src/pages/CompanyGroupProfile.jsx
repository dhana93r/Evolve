import React from 'react';
import { Typography, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import Loading from '../components/Loading';
import Error from '../components/Error';

const { Panel } = Collapse;

// Tata group structure for Accordions
const tataSegments = [
	{
		label: 'Automotive',
		companies: [
			{
				label: 'Tata Motors Ltd. (33.6%)',
				subs: [
					{ label: 'Tata AutoComp Systems Ltd. (81.3%)' },
					{ label: 'Automotive Stamping & Assemblies Ltd.' },
				],
			},
		],
	},
	{
		label: 'Engineering Services',
		companies: [
			{ label: 'Voltas (27.5%)' },
			{ label: 'Tata Projects' },
			{ label: 'TCE Consulting Engineers' },
		],
	},
	{
		label: 'Engineering Products',
		companies: [
			{ label: 'TAL Manufacturing Solutions' },
			{ label: 'Telco Construction Equipment Company' },
			{ label: 'TRF' },
		],
	},
	{
		label: 'Metals',
		companies: [
			{
				label: 'Tata Steel Ltd. (26.7%)',
				subs: [
					{ label: 'Tata Metaliks Ltd. (46.6%)' },
					{ label: 'Tata Sponge Iron Ltd. (39.7%)' },
					{ label: 'Tinplate Co. of India Ltd. (32.2%)' },
				],
			},
		],
	},
	{
		label: 'Composites',
		companies: [{ label: 'Tata Advanced Materials' }],
	},
	{
		label: 'Chemicals',
		companies: [
			{ label: 'Rallis India (45.4%)' },
			{
				label: 'Tata Chemicals Ltd. (28.6%)',
				subs: [{ label: 'Tata Pigments' }],
			},
		],
	},
	{
		label: 'Hotels and Realty',
		companies: [
			{
				label: 'Indian Hotels Co. Ltd. (Taj Hotels) (29.2%)',
				subs: [{ label: 'Oriental Hotels Ltd. (18.9%)' }],
			},
			{ label: 'Tata Housing Development Company' },
		],
	},
	{
		label: 'Financial Services',
		companies: [
			{ label: 'Tata Investment Corporation Ltd. (60.6%)' },
			{ label: 'Tata-AIG General Insurance' },
			{ label: 'Tata-AIG Life Insurance' },
			{ label: 'Tata Asset Management' },
			{ label: 'Tata Financial Services' },
		],
	},
	{
		label: 'Other Services',
		companies: [
			{ label: 'Tata Quality Management Services' },
			{ label: 'Tata Services' },
			{ label: 'Tata Strategic Management Group' },
		],
	},
	{
		label: 'Information Systems',
		companies: [
			{
				label: 'Tata Consultancy Services Ltd. (83.6%)',
				subs: [
					{ label: 'CMC Ltd. (51.1%)' },
					{ label: 'Tata Elxsi Ltd. (38.1%)' },
					{ label: 'Nelito Systems' },
					{ label: 'SerWizsol' },
					{ label: 'Tata Technologies' },
					{ label: 'Tata Interactive Systems' },
				],
			},
		],
	},
	{
		label: 'Communications',
		companies: [
			{
				label: 'Tata Teleservices (65.5%)',
				subs: [{ label: 'Tata Teleservices Maharashtra Ltd. (51.1%)' }],
			},
			{ label: 'Videsh Sanchar Nigam Ltd. (71.2%)' },
			{ label: 'Tata Sky' },
			{ label: 'Talanet' },
		],
	},
	{
		label: 'Industrial Automation',
		companies: [{ label: 'Nelco (50.1%)' }],
	},
	{
		label: 'Consumer Products',
		companies: [
			{ label: 'Tata Tea Ltd. (28.6%)' },
			{ label: 'Tata Coffee Ltd. (50.6%)' },
			{ label: 'Titan Industries Ltd. (52.8%)' },
			{ label: 'Trent Ltd. (26.3%)' },
			{ label: 'Tata Ceramics' },
			{ label: 'Tata McGraw Hill Publishing Company' },
		],
	},
	{
		label: 'Energy',
		companies: [
			{
				label: 'Tata Power Co. Ltd. (32.2%)',
				subs: [{ label: 'Tata BP Solar India' }],
			},
		],
	},
];

function CompanyAccordion({ segment }) {
	return (
		<Collapse
			bordered={false}
			expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
			style={{ marginBottom: 8 }}
			showArrow={true} // Ensure only one arrow is shown
		>
			<Panel header={<Typography.Text strong>{segment.label}</Typography.Text>} key={segment.label}>
				{segment.companies.map((company) =>
					company.subs ? (
						<Collapse
							bordered={false}
							expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
							style={{ marginBottom: 8, marginLeft: 16 }}
							key={company.label}
							showArrow={true} // Ensure only one arrow is shown
						>
							<Panel header={company.label} key={company.label}>
								{company.subs.map((sub) => (
									<Typography.Text key={sub.label} style={{ marginLeft: 16, display: 'block' }}>
										{sub.label}
									</Typography.Text>
								))}
							</Panel>
						</Collapse>
					) : (
						<Typography.Text key={company.label} style={{ marginLeft: 8, display: 'block' }}>
							{company.label}
						</Typography.Text>
					)
				)}
			</Panel>
		</Collapse>
	);
}

export default function CompanyGroupProfile() {
	return (
		<div
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100vw',
				boxSizing: 'border-box',
				overflowX: 'hidden',
				background: '#fff',
			}}
		>
			<div
				style={{
					width: '100%',
					maxWidth: 480,
					margin: '0 auto',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					padding: 32,
				}}
			>
				<Typography.Title
					level={4}
					style={{
						textAlign: 'center',
						marginBottom: 32,
						fontWeight: 700,
					}}
				>
					Group companies information
				</Typography.Title>
				<div
					style={{
						width: '100%',
						maxWidth: 900,
						margin: '0 auto',
						background: '#fff',
						borderRadius: 8,
						boxSizing: 'border-box',
						overflowX: 'hidden',
					}}
				>
					<Collapse
						defaultActiveKey={[tataSegments[0]?.label]}
						expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
						style={{ width: '100%' }}
						showArrow={true} // Ensure only one arrow is shown
					>
						<Panel header={<Typography.Text strong>Tata Sons</Typography.Text>} key="Tata Sons">
							{tataSegments.map((segment) => (
								<CompanyAccordion key={segment.label} segment={segment} />
							))}
						</Panel>
					</Collapse>
				</div>
			</div>
		</div>
	);
}

// No currency values to update in this file. No changes needed for Rupee or formatRupee.
