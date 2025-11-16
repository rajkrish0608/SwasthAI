import Badge from '../ui/Badge'

interface RiskBadgeProps {
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
    className?: string
}

export default function RiskBadge({ riskLevel, className = '' }: RiskBadgeProps) {
    const variant = riskLevel === 'LOW' ? 'low' : riskLevel === 'MEDIUM' ? 'medium' : 'high'

    const icons = {
        LOW: '✓',
        MEDIUM: '⚠',
        HIGH: '🚨',
    }

    return (
        <Badge variant={variant} className={className}>
            <span className="mr-1">{icons[riskLevel]}</span>
            {riskLevel} RISK
        </Badge>
    )
}
