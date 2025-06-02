import React from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loading from '../components/Loading';
import Error from '../components/Error';

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
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography fontWeight={600}>{segment.label}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{segment.companies.map((company, idx) =>
					company.subs ? (
						<Accordion
							key={company.label}
							sx={{ mb: 1 }}
							TransitionProps={{ unmountOnExit: true }}
						>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>{company.label}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{company.subs.map((sub, subIdx) => (
									<Typography
										key={sub.label}
										sx={{ ml: 2, mb: 0.5 }}
										variant="body2"
									>
										{sub.label}
									</Typography>
								))}
							</AccordionDetails>
						</Accordion>
					) : (
						<Typography
							key={company.label}
							sx={{ ml: 1, mb: 0.5 }}
							variant="body2"
						>
							{company.label}
						</Typography>
					)
				)}
			</AccordionDetails>
		</Accordion>
	);
}

export default function CompanyGroupProfile() {
	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				px: { xs: 1, sm: 2 },
				width: '100vw',
				boxSizing: 'border-box',
				overflowX: 'hidden',
				bgcolor: 'background.default',
			}}
		>
			<Box
				sx={{
					width: '100%',
					maxWidth: 480,
					minWidth: { xs: '90vw', sm: 400 },
					mx: 'auto',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					py: 4,
				}}
			>
				<Typography variant="h4" fontWeight={700} align="center" mb={4}>
					Group companies information
				</Typography>
				<Box
					sx={{
						width: '100%',
						maxWidth: { xs: '100%', sm: '900px' },
						mx: 'auto',
						boxShadow: { xs: 0, md: 2 },
						borderRadius: { xs: 0, sm: 2 },
						bgcolor: 'background.paper',
						boxSizing: 'border-box',
						overflowX: 'hidden',
					}}
				>
					<Accordion defaultExpanded TransitionProps={{ unmountOnExit: true }} sx={{ width: '100%' }}>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography fontWeight={700}>Tata Sons</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{tataSegments.map((segment) => (
								<CompanyAccordion key={segment.label} segment={segment} />
							))}
						</AccordionDetails>
					</Accordion>
				</Box>
			</Box>
		</Box>
	);
}

// No currency values to update in this file. No changes needed for Rupee or formatRupee.
