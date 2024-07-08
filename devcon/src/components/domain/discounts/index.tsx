import { Verifier } from './verifier'
import Background from 'assets/images/pages/program.svg'
import css from '../../common/card/call-to-action.module.scss'

export function SelfClaimingDiscounts() {
  return (
    <div className="section my-12 relative">
        <div className="anchor absolute -top-20" id="discounts"></div>
        <div className="h2 bold mb-6 pt-8 border-top">Discounts</div>
        <p>Methods for claiming Devcon ticket discounts</p>

        <div className="text-xl bold font-secondary mb-6 mt-8">Self-claimed</div>
        <p>We are offering Reserved or Discounted to a few groups, including</p>
        <ul className="flex flex-row list-disc list-inside mt-4 gap-4 font-semibold flex-wrap">
          <li>Core devs</li>
          <li>Open-Source contributors</li>
          <li>Public Good project owners</li>
          <li>DAO participants</li>
          <li>Past attendees</li>
        </ul>

        <div className={`rounded-xl shadow mt-8 ${css['message-card']} ${css['blue']}`}>
          <div className={`z-1 ${css['background']}`}>
            <Background />
          </div>
      
          <Verifier />
        </div>
      </div>
  )
}
