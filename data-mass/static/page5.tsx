import { Divider, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import * as tp from '@/types'


export const Page5 = () => {

    // Language
    const language = useSelector((state: tp.RootState) => state.language)
    
    return (
        language === 'ko-KR' ? (
            <>
            <Typography variant='h6'>이용약관</Typography>
            
            <p>본 이용약관(이하 "약관")은 안드로이드 앱을 배포하는 조건으로 지참이 요구되는 플레이의 조건에 따라 작성되었습니다. 본 약관은 웹사이트 소유자인 매직보드이 정의한 일련의 법적 조건으로, 매직보드에서 발행한 모든 웹 서비스와 앱의 사용자와 소유자 간의 관계를 규율하는 내용을 명시하고 있습니다. 각 용어는 자사가 서비스를 효율적으로 제공하는 일에 요구되는 특성에 따라 정의되어야 합니다. 또한, 약관은 해당 서비스를 제공하는 매직보드이 잠재적인 법적 노출로부터 자신을 보호할 수 있는 능력을 제공합니다.</p>
            
            <Typography variant='body1'>목차</Typography>
            
            <Typography>1. 매직보드에서 발행한 모든 웹 서비스 및 앱 상에서 필요한 사용자 계정 생성 조건</Typography>
            <Typography>2. 고객에게 제시되는 주요 비즈니스 조건</Typography>
            <Typography>3. 제공사항 변경 및 권한 유지</Typography>
            <Typography>4. 서비스와 제품에 대한 보증과 책임</Typography>
            <Typography>5. 지적 재산권, 저작권 및 로고 소유권</Typography>
            <Typography>6. 회원 계정을 정지, 취소 또는 삭제할 권리</Typography>
            <Typography>7. 면책</Typography>
            <Typography>8. 책임의 제한</Typography>
            <Typography>9. 약관을 변경 및 수정할 권리</Typography>
            <Typography>10. 이용약관의 구속력</Typography>
            <Typography>11. 법률 및 분쟁 해결의 우선순위</Typography>

            <br/>
            <Divider />
            <br/>
            
            <p>1. 매직보드에서 발행한 모든 웹 서비스 및 앱 상에서 필요한 사용자 계정 생성 조건</p>
            
            <p>당사 웹 서비스 혹은 앱을 이용하고 위해서 귀하의 관할권에서 법적으로 최소 16세 이상이며 당사의 서비스를 의사대로 활용할 수 있는 독립성이 요구되며, 합법적인 권한을 보유하고 있으며 본 이용 약관을 구속력 있는 계약으로 체결할 수 있는 권리와 자유를 소유하고 있어야 합니다. 귀하의 국가에서, 또는 귀하에게 적용되는 법률이나 규정 하에서 금지된 경우, 혹은 불법적인 행위에 의한 동기가 있을 경우, 귀하는 서비스를 사용하거나 제공받을 수 없습니다.</p>
            
            <p>2. 고객에게 제시되는 주요 비즈니스 조건</p>
            
            <p>서비스를 사용하기 위해 비트코인을 포함한 금전적인 대가를 지불하는 즉시 다음에 동의합니다:</p>
            
            <p>(i) 사용자는 금전적 대가를 지불하기 전, 서비스에 대해 당사에서 제공된 정보와 스스로 탐구하여 얻어낸 지식을 충분히 반영하여 의사결정을 내려야 할 책임이 있습니다. (ii) 서비스에 대한 대가를 지불할 시 해당 행위를 위한 법적 구속력이 있는 계약을 체결합니다.</p>
            
            <p>당사가 서비스 이용에 대해 부과하는 요금은 당사에서 제공하는 앱 상에 공유되어 있습니다. 당사는 언제든지 표시되는 이용료 혹은 수수료를 변경하고 우발적으로 발생할 수 있는 가격 책정 오류를 수정할 권리를 보유합니다.</p>
            
            <p>3. 제공사항 변경 및 권한 유지</p>
            
            <p>당사는 사전 예고없이 서비스를 변경, 서비스 또는 당사가 제공하는 서비스의 모든 기능 제공 중단, 또는 서비스에 대한 제한을 둘 수 있습니다. 당사는 어떤 이유로든 통지 및 책임없이 서비스에 대한 액세스를 영구적으로 또는 일시적으로 종료하거나 일시 중단할 수 있습니다.</p>
            
            <p>4. 서비스와 제품에 대한 보증과 책임</p>
            
            <p>당사에게 착오로 지급된 지급금에 대해서 합법적이며 유효한 방법으로 반환 요청할 경우 당사는 이행해 드립니다. 해당 행위에서 비용이 발생한다면 고객은 발생한 비용 부분에 대한 책임을 부담합니다.</p>
            
            <p>5. 지적 재산권, 저작원 및 로고의 소유권</p>
            
            <p>소프트웨어, 이미지, 텍스트, 그래픽, 로고, 특허, 상표, 서비스 마크, 저작권, 사진, 오디오, 비디오, 음악 및 이와 관련된 모든 지적 재산권을 포함하되 이에 국한되지 않고 이에 포함되거나 전송되는 모든 서비스는 매직보드의 독점적인 자산입니다. 본 이용 약관에서 명시적으로 제공된 경우를 제외하고 본 이용 약관의 어떠한 조항도 그러한 지적 재산권에 대한 라이센스를 만들지는 않으며, 귀하는 그러한 지적 재산권을 판매, 라이센스, 임대, 수정, 배포, 복사, 복제, 전송, 공개적으로 수행, 게시, 개작, 편집 또는 파생 작업을 수행 할 수 없습니다.</p>
            
            <p>6. 회원 계정을 정지, 취소 또는 삭제할 권리</p>
            
            <p>당사는 귀하가 본 이용 약관이나 관련 법률 또는 규정을 위반하는 경우를 포함하여 어떤 이유로든지 당사의 단독 결정으로 통지 및 책임없이 서비스에 대한 액세스를 영구적 또는 일시적으로 종료 또는 정지할 수 있습니다. 귀하는 언제든지 귀한의 계정 또는 서비스 사용을 중단하도록 해당 권리의 사용을 요청할 수 있습니다. 앞서 말한 내용과 상반되는 조항임에도 불구하고 약속된 금전적 대가를 고객에게 이행할 수 있습니다.</p>
            
            <p>7. 면책</p>
            
            <p>귀하는 귀하의 웹 서비스 및 앱에서 제공되는 서비스 중 하나를 사용함으로 인해, 또는 귀하의 사용과 관련하여 발생하는 제 3자의 요구, 손실, 책임, 청구 또는 비용(변호사 수임료 포함)으로 부터 매직보드을 면책하고 보유할 것에 동의합니다.</p>
            
            <p>8. 책임의 제한</p>
            
            <p>해당 법률에서 허용하는 최대 한도 내에서 어떠한 경우에도 매직보드은 이익 손실, 영업권, 사용, 데이터 또는 기타 무형 손실에 대한 손해를 포함하되 이에 국한되지 않는 간접적, 징벌적, 우발적, 특수한, 파생적, 또는 처벌적 손해 배상금에 대한 책임을 지지 않을 수 있습니다.</p>
            
            <p>해당 법률에서 허용하는 최대 한도 내에서 매직보드은 (i) 오류, 실수, 또는 냉용의 부정확성 (ii) 귀하의 서비스 액세스 또는 사용으로 인해 발생하는 인적 상해 또는 재산상의 손해 (iii) 보안 서버 및 여기에 저장된 모든 개인 정보에 대한 무단 액세스 또는 사용에 대해 어떠한 책임이나 의무도 지지 않습니다.</p>
            
            <p>9. 약관을 변경 및 수정할 권리</p>
            
            <p>당사는 자유 재량에 따라 본 이용 약관을 수시로 변경할 수 있는 권리를 보유합니다. 따라서, 이 페이지를 주기적으로 검토해야 합니다., 당사가 실질적으로 약관을 변경하면, 이용 약관에 중대한 변경 사항이 있음을 알려드립니다. 변경 사항 확인 후 귀하가 웹 사이트 또는 당사의 앱 서비스를 계속 사용한다면, 귀하는 새로운 이용 약관을 수락하는 것으로 간주됩니다. 본 이용 약관 또는 향후 버전의 이용 약관에 동의하지 않을 경우, 웹 사이트 또는 서비스를 사용하거나 액세스하지 마십시오.</p>
            
            <p>10. 이용약관의 구속력</p>
            
            <p>해당 페이지는 매직보드이 소유하고 운영하고 있으며, 본 이용 약관은 귀하가 당사가 제공하는 웹 서비스 및 앱을 이용할 수 있는 조건을 규정합니다. 해당 페이지의 방문자에게 매직보드 웹 사이트와 디지월드를 비롯한 앱 서비스를 제공합니다. 해당 페이지에 액세스하거나 사용함으로써 귀하는 귀하가 본 이용 약관을 읽고 이해했으며, 이에 동의하는 것으로 간주됩니다.</p>
            
            <p>11. 법률 및 분쟁 해결의 우선 순위</p>
            
            <p>본 이용 약관, 본 계약에 제공된 권리 및 구제책, 본 계약 또는 서비스와 관련된 모든 청구 및 분쟁은 법률 충돌 원칙과 관계 없이 대한민국의 국내 실체법에 따라 모든 면에서 단독으로 그리고 독점적으로 해석되고 해석되어야 합니다. 그러한 모든 주장 및 분쟁은 강서구에 소재한 관할 법원에서 제기되며, 독점적으로 결정될 것에 동의합니다.</p>
            </>
        ) : (
            <>
            <Typography variant='h6'>Terms and Conditions</Typography>
            <p>The following Terms and Conditions have been written in accordance with the conditions preceded by Play, which are required for distributing Android apps. These Terms represent a set of legal conditions defined by Magic Board, the owner of the website, to govern the relationship between users and owners of all web services and apps issued by Magic Board. Each term should be defined based on the characteristics required for efficient provision of our services. Furthermore, these Terms provide Magic Board, the provider of the services, with the ability to protect itself from potential legal exposure.</p>
            
            <Typography variant='body1'>Contents</Typography>
            
            <Typography>1. Conditions for creating user accounts required on all web services and apps issued by Magic Board.</Typography>
            <Typography>2. Key business conditions presented to customers.</Typography>
            <Typography>3. Changes to provided services and maintenance of authority.</Typography>
            <Typography>4. Warranty and liability for services and products.</Typography>
            <Typography>5. Intellectual property rights, copyrights, and logo ownership.</Typography>
            <Typography>6. Right to suspend, cancel, or delete accounts.</Typography>
            <Typography>7. Disclaimer.</Typography>
            <Typography>8. Limitation of liability.</Typography>
            <Typography>9. Right to change and modify the terms and conditions.</Typography>
            <Typography>10. Enforceability of the Terms and Conditions.</Typography>
            <Typography>11. Priority of laws and dispute resolution.</Typography>
            <br/>
            <Divider />
            <br/>
            <p>1. Conditions for creating user accounts required on all web services and apps issued by Magic Board.</p>
            
            <p>In order to use our web services or apps, you must be legally at least 16 years of age in your jurisdiction and possess the independence to utilize our services at your own discretion. You should have lawful authority and the right to enter into this binding agreement under these Terms of Service. If the use of our services is prohibited in your country or under the laws and regulations applicable to you, or if there is any motivation based on illegal activities, you are not allowed to use or access the services.</p>
            
            <p>2. Key business conditions presented to customers.</p>
            
            <p>Upon paying the monetary consideration, including but not limited to Bitcoin, to use the service, you hereby agree to the following:</p>
            
            <p>(i) Before the user pays the monetary consideration, they are responsible for making informed decisions by adequately considering the information provided by our company and knowledge obtained through their own research regarding the service. (ii) Upon payment of the consideration for the service, the user enters into a legally binding contract for the said transaction.</p>
            
            <p>The fees imposed by our company for using the service are disclosed on the app provided by our company. We reserve the right to modify the displayed fees or charges at any time and correct any accidental pricing errors that may occur.</p>
            
            <p>3. Changes to provided services and maintenance of authority.</p>
            
            <p>Our company reserves the right to modify the service, discontinue any or all features of the service provided by our company, or impose restrictions on the service without prior notice. We may permanently or temporarily terminate or suspend access to the service for any reason and without any notification or liability.</p>
            
            <p>4. Warranty and liability for services and products.</p>
            
            <p>If a payment is made to our company in error and a legitimate and valid request for a refund is submitted, we will process the refund in an appropriate manner. If any costs are incurred in this process, the customer will be responsible for those incurred costs.</p>
            
            <p>5. Intellectual property rights, copyrights, and logo ownership.</p>
            
            <p>Software, images, text, graphics, logos, patents, trademarks, service marks, copyrights, photographs, audio, video, music, and all related intellectual property rights, including but not limited to those incorporated or transmitted within the services, are the exclusive property of Magic Board. Except as explicitly provided in these Terms of Service, no provision of these Terms of Service shall create any license to such intellectual property rights, and you are not allowed to sell, license, lease, modify, distribute, copy, reproduce, transmit, publicly perform, display, adapt, publish, translate, create derivative works, edit, or engage in any similar activities with respect to such intellectual property rights.</p>
            
            <p>6. Right to suspend, cancel, or delete accounts.</p>
            
            <p>Our company reserves the right to permanently or temporarily terminate or suspend access to the service for any reason, at our sole discretion and without any notification or liability, including instances where you violate these Terms of Service, related laws, or regulations. You have the right to request the termination of your account or service usage at any time. Despite any conflicting provisions stated earlier, our company may still fulfill the promised monetary consideration to the customer.</p>
            
            <p>7. Disclaimer.</p>
            
            <p>By using any of our web services and apps, you agree to indemnify and hold Magic Board harmless from any demands, losses, liabilities, claims, or expenses (including attorney's fees) incurred by third parties due to your use or related to your use of the service.</p>
            
            <p>8. Limitation of liability.</p>
            
            <p>To the extent permitted by applicable law, under no circumstances shall Magic Board be liable for any indirect, punitive, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, business, use, data, or other intangible losses.</p>
            
            <p>Within the maximum extent allowed by applicable law, Magic Board shall not be liable for (i) errors, inaccuracies, or omissions in the service, (ii) any personal injury or property damage resulting from your access to or use of the service, or (iii) any unauthorized access to or use of the secure servers and any personal information stored therein.</p>
            
            <p>9. Right to change and modify the terms and conditions.</p>
            
            <p>Our company reserves the right to modify these Terms of Service at its sole discretion. Therefore, it is essential to periodically review this page. If we make substantial changes to the Terms of Service, we will notify you of the significant modifications. If you continue to use our website or app services after confirming the changes, you will be considered as having accepted the new Terms of Service. If you do not agree to these Terms of Service or any future versions of the Terms of Service, please refrain from using or accessing our website or services.</p>
            
            <p>10. Enforceability of the Terms and Conditions.</p>
            
            <p>This page is owned and operated by Magic Board, and these Terms of Service govern your access and use of the web services and apps provided by our company, including Magic Board's website and Digiworld. By accessing or using this page, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.</p>
            
            <p>11. Priority of laws and dispute resolution.</p>
            
            <p>These Terms of Service, the rights and remedies provided in these Terms, and any claims or disputes related to these Terms or the services shall be governed and interpreted solely and exclusively in accordance with the substantive laws of the Republic of Korea, regardless of any principles of conflicts of laws. All such claims and disputes shall be brought exclusively in the competent courts located in Gangseo-gu, and you agree to the exclusive jurisdiction of such courts for the resolution of any and all disputes.</p>
            </>
        )
    )
}
